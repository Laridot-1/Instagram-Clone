import React, { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "./firebase"
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"

const AppContext = createContext()

const useGlobalContext = () => useContext(AppContext)

const Context = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isFetchingProfile, setIsFetchingProfile] = useState(true)

  class Auth {
    static signup(email) {
      const actionCodeSettings = {
        handleCodeInApp: true,
        url: "http://localhost:5173/accounts/complete-signup",
      }
      return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    }
    static signin(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
    }
    static signout() {
      return signOut(auth)
    }
    static resetPassword(email) {
      const actionCodeSettings = {
        handleCodeInApp: true,
        url: "http://localhost:5173/accounts/",
      }
      return sendPasswordResetEmail(auth, email, actionCodeSettings)
    }
  }

  class User {
    static async getUserProfile(username) {
      try {
        setIsFetchingProfile(true)
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        )
        const querySnapshot = await getDocs(q)
        let userProfile
        if (!querySnapshot.empty) {
          querySnapshot.forEach((data) => {
            userProfile = data.data()
          })
          setProfile(userProfile)
          setIsFetchingProfile(false)
        } else {
          setProfile(null)
          setIsFetchingProfile(false)
        }
      } catch (err) {
        alert(err.message)
        setProfile(null)
        setIsFetchingProfile(false)
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (res) => {
      if (res) {
        try {
          const currentUser = await getDoc(doc(db, "users", res.uid))
          setUser(currentUser.data())
          localStorage.setItem("user", JSON.stringify(currentUser.data()))
        } catch (err) {
          alert(err.message)
        }
      } else {
        setUser(null)
        localStorage.removeItem("user")
      }
    })

    return () => unsubscribe()
  }, [])

  const obj = { Auth, User, user, setUser, profile, isFetchingProfile }

  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>
}

export { useGlobalContext, Context }
