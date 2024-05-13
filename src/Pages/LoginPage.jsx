import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../Context"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const LoginPage = () => {
  const [cred, setCred] = useState({ email: "", password: "" })
  const [err, setErr] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { Auth, setUser } = useGlobalContext()
  const navigate = useNavigate()

  const handleInput = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    if (!cred.email || !cred.password) {
      setErr("Please fill all fields.")
      return
    }

    try {
      setIsLoggingIn(true)
      const currentlySignedinUser = await Auth.signin(cred.email, cred.password)
      const currentUser = await getDoc(
        doc(db, "users", currentlySignedinUser.user.uid)
      )
      setUser(currentUser.data())
      localStorage.setItem("user", JSON.stringify(currentUser.data()))
      setCred({ email: "", password: "" })
      setIsLoggingIn(false)
      navigate("/")
    } catch (err) {
      setErr(err.code)
      setIsLoggingIn(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setErr("")
    }, 3000)
    return () => clearTimeout(id)
  }, [err])

  return (
    <section className="login-section auth-section">
      <img src="/auth.png" alt="Auth image" />

      <div className="auth-container">
        <div className="auth-box">
          <div className="heading">
            <img src="/logo.png" alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={cred.email}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={cred.password}
              onChange={(e) => handleInput(e)}
            />
            <button
              disabled={
                cred.email && cred.password.length >= 6 && !isLoggingIn
                  ? false
                  : true
              }
              onClick={handleLogin}
            >
              Log in
            </button>
          </form>
          {err ? <p className="err">{err}</p> : ""}
          <Link to="/accounts/forgotten-password" className="fp">
            Forgotten your password?
          </Link>
        </div>

        <div className="auth-referral">
          <p>
            Don't have an account? <Link to="/accounts/signup">Sign up</Link>
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

export default LoginPage
