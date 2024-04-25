import React, { useState } from "react"
import { Link } from "react-router-dom"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")

  const handleSignup = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="signup-section">
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
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={email ? false : true} onClick={handleSignup}>
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
