import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "./firebase"
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

const AppContext = createContext()

const useGlobalContext = () => useContext(AppContext)

const Context = ({ children }) => {
  const [user, setUser] = useState(null)

  //Profile States
  const [profile, setProfile] = useState(null)
  const [isFetchingProfile, setIsFetchingProfile] = useState(true)

  //Following States
  const [isFollowing, setIsFollowing] = useState(false)
  const [isHandlingFollowing, setIsHandlingFollowing] = useState(false)

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
    static async getUser() {
      try {
        const currentUser = await getDoc(doc(db, "users", user?.uid))
        setUser(currentUser.data())
      } catch (err) {
        alert(err.message)
      }
    }
    static async followUser(uid) {
      setIsHandlingFollowing(true)

      try {
        await updateDoc(doc(db, "users", user.uid), {
          following: isFollowing ? arrayRemove(uid) : arrayUnion(uid),
        })
        await updateDoc(doc(db, "users", uid), {
          followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
        })

        if (isFollowing) {
          setUser({
            ...user,
            following: user.following.filter((uid) => uid !== uid),
          })

          if (profile) {
            setProfile({
              ...profile,
              followers: profile.followers.filter((uid) => uid !== user.uid),
            })
          }

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              following: user.following.filter((uid) => uid !== uid),
            })
          )

          setIsFollowing(false)
        } else {
          setUser({
            ...user,
            following: [...user.following, uid],
          })

          if (profile) {
            setProfile({
              ...profile,
              followers: [...profile.followers, user.uid],
            })
          }

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              following: [...user.following, uid],
            })
          )

          setIsFollowing(true)
        }

        setIsHandlingFollowing(false)
      } catch (err) {
        alert(err.message)
        setIsHandlingFollowing(false)
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      setUser(res)
    })

    return () => unsubscribe()
  }, [])

  const obj = {
    Auth,
    User,
    user,
    setUser,
    profile,
    isFetchingProfile,
    isFollowing,
    setIsFollowing,
    isHandlingFollowing,
  }

  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>
}

export { useGlobalContext, Context }
