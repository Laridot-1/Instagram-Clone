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
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage"

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
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [isFetchingPost, setIsFetchingPost] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)

  //FeedPosts States
  const [isFetchingFeedPosts, setIsFetchingFeedPosts] = useState(true)

  class Auth {
    static signup(email) {
      const actionCodeSettings = {
        handleCodeInApp: true,
        url: "https://larinsta.vercel.app/accounts/complete-signup",
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
        url: "https://larinsta.vercel.app/accounts",
      }
      return sendPasswordResetEmail(auth, email, actionCodeSettings)
    }
  }

  class User {
    static async getUserProfile(username) {
      setProfile(null)
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
      if (isCreatingPost) {
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
        if (profile) {
          setProfile({ ...profile, posts: [newPost.id, ...profile.posts] })
        }

        alert("Post uploaded successfully")
        setIsCreatingPost(false)
      } catch (err) {
        alert(err.message)
        setIsCreatingPost(false)
      }
    }
    static async getPosts() {
      setPosts([])
      setIsFetchingPost(true)
      if (!profile) return

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
    static async deletePost(id) {
      if (!confirm("Are you sure you want to delete this post?")) {
        return
      }
      if (isDeleting) {
        return
      }
      setIsDeleting(true)

      try {
        await deleteObject(ref(storage, `posts/${id}`))
        await deleteDoc(doc(db, "posts", id))
        await updateDoc(doc(db, "users", user.uid), {
          posts: arrayRemove(id),
        })

        const newPosts = posts.filter((postId) => postId !== id)
        setPosts(newPosts)
        setProfile({
          ...profile,
          posts: profile.posts.filter((postId) => postId !== id),
        })
        setIsDeleting(false)
      } catch (err) {
        alert(err.message)
        setIsDeleting(false)
      }
    }
    static async addComment(postId, comment) {
      if (!user) {
        return
      }
      if (isCommenting) {
        return
      }
      setIsCommenting(true)

      const newComment = {
        postId,
        comment,
        createdAt: Date.now(),
        createdBy: user.uid,
      }

      try {
        await updateDoc(doc(db, "posts", postId), {
          comments: arrayUnion(newComment),
        })

        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            }
          }
          return post
        })
        setPosts(updatedPosts)

        setIsCommenting(false)
      } catch (err) {
        alert(err.message)
        setIsCommenting(false)
      }
    }
    static async getFeedPosts() {
      setIsFetchingFeedPosts(true)
      if (user?.following && user.following.length < 1) {
        setIsFetchingFeedPosts(false)
        setPosts([])
        return
      }

      if (user?.username) {
        try {
          let q = query(
            collection(db, "posts"),
            where("createdBy", "in", user.following)
          )
          let querySnapshot = await getDocs(q)

          let feedPosts = []

          querySnapshot.forEach((doc) => {
            feedPosts.push({ ...doc.data(), id: doc.id })
          })

          feedPosts.sort((a, b) => b.createdAt - a.createdAt)

          setPosts(feedPosts)

          setIsFetchingFeedPosts(false)
        } catch (err) {
          alert(err.message)
          setIsFetchingFeedPosts(false)
        }
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
    setPosts,
    isCreatingPost,
    isFetchingPost,
    isDeleting,
    isCommenting,
    isFetchingFeedPosts,
  }

  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>
}

export { useGlobalContext, Context }
