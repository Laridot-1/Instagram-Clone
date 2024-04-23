import React from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="login-section">
      <img src="/auth.png" alt="Auth image" />
      <div className="container">
        <div className="login-content">
          <img src="/logo.png" alt="logo" />
          <form onClick={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button>Log in</button>
          </form>
          <Link to="/auth/forgotten-password">Forgotten your password?</Link>
        </div>
        <div className="signup-content">
          <p>
            Don't have an account? <Link to="/auth/signup">Sign up</Link>
          </p>
        </div>
        <div className="install-content">
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
