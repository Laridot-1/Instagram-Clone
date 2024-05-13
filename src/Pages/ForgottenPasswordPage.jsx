import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../Context"

const ForgottenPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { Auth } = useGlobalContext()

  const handleResetPassword = async () => {
    if (!email) {
      setErr("Enter a valid email address")
      return
    }

    setIsSending(true)
    try {
      await Auth.resetPassword(email)
      setIsSent(true)
      setEmail("")
      setIsSending(false)
    } catch (err) {
      setErr(err.message)
      setIsSent(false)
      setIsSending(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setErr("")
    }, 3000)
    return () => clearTimeout(id)
  }, [err])

  useEffect(() => {
    let id = setTimeout(() => {
      setIsSent(false)
    }, 3000)
    return () => clearTimeout(id)
  }, [isSent])

  return (
    <section className="forgotten-password-section auth-section">
      <div className="auth-container">
        <div className="auth-box">
          <div className="heading">
            <img src="/logo.png" alt="logo" />
            <div className="info">
              {isSent ? (
                <p>
                  We've sent a password reset link to your email. You might want
                  to check your spam.
                </p>
              ) : (
                <>
                  <h3>Trouble with logging in?</h3>
                  <p>
                    Enter your email address and we'll send a link to reset your
                    password.
                  </p>
                </>
              )}
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
            <button
              disabled={email && !isSending ? false : true}
              onClick={handleResetPassword}
            >
              Send password reset link
            </button>
          </form>

          <Link to="/accounts/" className="back-to-login">
            Back to login
          </Link>

          {err ? <p className="err">{err}</p> : ""}
        </div>
      </div>
    </section>
  )
}

export default ForgottenPasswordPage
