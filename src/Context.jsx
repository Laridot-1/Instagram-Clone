import { createContext, useContext, useEffect, useState } from "react"
import { auth, db, storage } from "./firebase"
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

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

  //Create Post States
  const [posts, setPosts] = useState([])
  const [isCreatingpost, setIsCreatingPost] = useState(false)
  const [isFetchingPost, setIsFetchingPost] = useState(true)

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
    static async createPost(selectedImage, caption) {
      if (isCreatingpost) {
        return
      }
      if (!selectedImage) {
        return alert("Please select an image")
      }
      setIsCreatingPost(true)
      const newPost = {
        caption,
        likes: [],
        comments: [],
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      }

      try {
        let postId = await addDoc(collection(db, "posts"), newPost)
        await updateDoc(doc(db, "users", user.uid), {
          posts: arrayUnion(postId.id),
        })
        await uploadString(
          ref(storage, `posts/${postId.id}`),
          selectedImage,
          "data_url"
        )

        let url = await getDownloadURL(ref(storage, `posts/${postId.id}`))

        await updateDoc(postId, {
          imageUrl: url,
        })

        newPost.imageUrl = url
        newPost.id = postId.id

        setPosts([newPost, ...posts])
        setProfile({ ...profile, posts: [newPost.id, ...profile.posts] })

        alert("Post uploaded successfully")
        setIsCreatingPost(false)
      } catch (err) {
        alert(err.message)
        setIsCreatingPost(false)
      }
    }
    static async getPosts() {
      if (!profile) return
      setIsFetchingPost(true)
      setPosts([])

      try {
        let q = query(
          collection(db, "posts"),
          where("createdBy", "==", profile.uid)
        )
        let querySnapshot = await getDocs(q)

        let posts = []

        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id })
        })

        posts.sort((a, b) => b.createdAt - a.createdAt)

        setPosts(posts)

        setIsFetchingPost(false)
      } catch (err) {
        alert(err.message)
        setIsFetchingPost(false)
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
    posts,
    isCreatingpost,
    isFetchingPost,
  }

  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>
}

export { useGlobalContext, Context }
