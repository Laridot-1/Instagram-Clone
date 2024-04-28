import React, { useRef, useState } from "react"

const CompleteSignupPage = () => {
  const [err, setErr] = useState("")
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    uname: "",
    age: "",
    pword: "",
  })
  const genderRef = useRef(null)

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleComplete = () => {
    console.log({ ...userInfo, gender: genderRef.current.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

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
              name="age"
              id="age"
              value={userInfo.age}
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
                userInfo.age &&
                userInfo.pword
                  ? false
                  : true
              }
              onClick={handleComplete}
            >
              Complete Registration
            </button>
          </form>
          {err ? <p className="err">err</p> : ""}
        </div>
      </div>
    </section>
  )
}

export default CompleteSignupPage
