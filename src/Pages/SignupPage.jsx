import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../Context"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const { Auth } = useGlobalContext()

  const emailReg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  const handleSignup = async () => {
    if (emailReg.test(email)) {
      setIsSending(true)
      try {
        let q = query(collection(db, "users"), where("email", "==", email))
        let querysnapshots = await getDocs(q)
        if (!querysnapshots.empty) {
          setErr("Email already in use by another account.")
          setIsSending(false)
          return
        }

        await Auth.signup(email)
        localStorage.setItem("emailForSignUp", email)
        setIsSent(true)
        setEmail("")
        setIsSending(false)
      } catch (err) {
        setErr(err.code)
      }
    } else {
      setErr("Enter a valid email address")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setErr("")
    }, 3000)
    return () => id
  }, [err])

  useEffect(() => {
    let id = setTimeout(() => {
      setIsSent(false)
    }, 3000)
    return () => id
  }, [isSent])

  return (
    <section className="signup-section auth-section">
      <div className="auth-container">
        <div className="auth-box">
          <div className="heading">
            <img src="/logo.png" alt="logo" />
            {isSent ? (
              <p>
                Check your email for a link to complete your sign up. You might
                want to check your spam messages.
              </p>
            ) : (
              ""
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={email && !isSending ? false : true}
              onClick={handleSignup}
            >
              Verify Email
            </button>
          </form>
          {err ? <p className="err">{err}</p> : ""}
        </div>

        <div className="auth-referral">
          <p>
            Have an account? <Link to="/accounts">Log in</Link>
          </p>
        </div>

        <div className="install-app">
          <p>Get the app.</p>
          <div className="img-flex">
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DD578A37F-26E0-4813-9123-9683067D26C6%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge">
              <img src="/playstore.png" alt="playstore icon" />
            </a>
            <a href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=707%2C0%2C666%2C735">
              <img src="/microsoft.png" alt="microsoft icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage
