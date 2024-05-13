import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { auth, db } from "../firebase"
import { Navigate, useNavigate } from "react-router-dom"
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore"
import { useGlobalContext } from "../Context"

const CompleteSignupPage = () => {
  const [err, setErr] = useState("")
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    uname: "",
    dob: "",
    pword: "",
  })
  const [isCompletingSignup, setIsCompletingSignup] = useState(false)
  const genderRef = useRef(null)
  const { setUser } = useGlobalContext()
  const navigate = useNavigate()

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleComplete = async () => {
    if (
      !userInfo.fname ||
      !userInfo.lname ||
      !userInfo.uname ||
      !userInfo.dob ||
      !userInfo.pword
    ) {
      setErr("Please fill all fields.")
      return
    }

    try {
      setIsCompletingSignup(true)

      let email = localStorage.getItem("emailForSignUp")
      if (!email) {
        email = prompt("Please provide your email for confirmation")
      }

      const q = query(
        collection(db, "users"),
        where("username", "==", userInfo.uname)
      )
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setErr("Username already exist.")
        setIsCompletingSignup(false)
        return
      }

      await signInWithEmailLink(auth, email, location.href)

      localStorage.removeItem("emailForSignUp")

      await updatePassword(auth.currentUser, userInfo.pword)

      const newUser = {
        gender: genderRef.current.value,
        uid: auth.currentUser.uid,
        username: userInfo.uname,
        email,
        fullName: `${userInfo.fname} ${userInfo.lname}`,
        profilePicURL: "",
        bio: "",
        dob: userInfo.dob,
        cretedAt: serverTimestamp(),
        followers: [],
        following: [],
        posts: [],
      }

      await setDoc(doc(db, "users", auth.currentUser.uid), newUser)

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      setUserInfo({
        fname: "",
        lname: "",
        uname: "",
        dob: "",
        pword: "",
      })
      setIsCompletingSignup(false)
      navigate("/")
    } catch (err) {
      setErr(err.code)
      setIsCompletingSignup(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (!isSignInWithEmailLink(auth, location.href)) {
    return <Navigate to="/accounts" />
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setErr("")
    }, 3000)
    return () => clearTimeout(id)
  }, [err])

  return (
    <section className="complete-signup-section auth-section">
      <div className="auth-container">
        <div className="auth-box">
          <div className="heading">
            <img src="/logo.png" alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First name"
              value={userInfo.fname}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              value={userInfo.lname}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              name="uname"
              id="uname"
              placeholder="Username"
              value={userInfo.uname}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="date"
              name="dob"
              id="dob"
              value={userInfo.dob}
              onChange={(e) => handleInput(e)}
            />
            <select name="gender" id="gender" ref={genderRef}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              name="pword"
              id="pword"
              value={userInfo.pword}
              onChange={(e) => handleInput(e)}
              placeholder="Password"
            />
            <button
              disabled={
                userInfo.fname &&
                userInfo.lname &&
                userInfo.uname &&
                userInfo.dob &&
                userInfo.pword.length >= 6 &&
                !isCompletingSignup
                  ? false
                  : true
              }
              onClick={handleComplete}
            >
              Complete Registration
            </button>
          </form>
          {err ? <p className="err">{err}</p> : ""}
        </div>
      </div>
    </section>
  )
}

export default CompleteSignupPage
