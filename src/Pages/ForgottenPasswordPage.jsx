import React, { useState } from "react"
import { Link } from "react-router-dom"

const ForgottenPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")

  const handleLogin = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="forgotten-password-section">
      <div className="auth-container">
        <div className="auth-box">
          <div className="heading">
            <img src="/logo.png" alt="logo" />
            <div className="info">
              <h3>Trouble with logging in?</h3>
              <p>
                Enter your email address and we'll send a link to reset your
                password.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={email ? false : true} onClick={handleLogin}>
              Send password reset link
            </button>
          </form>

          <Link to="/accounts/" className="back-to-login">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ForgottenPasswordPage
