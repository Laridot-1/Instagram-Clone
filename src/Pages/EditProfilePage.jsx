import { getDownloadURL, ref, uploadString } from "firebase/storage"
import React, { useEffect, useRef, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { db, storage } from "../firebase"
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { useGlobalContext } from "../Context"

const EditProfilePage = () => {
  const { user } = useOutletContext()
  const [src, setSrc] = useState("")
  const [userInfo, setUserInfo] = useState({
    fName: "",
    lName: "",
    uName: "",
    bio: "",
  })
  const genderRef = useRef(null)
  const [err, setErr] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const { setUser } = useGlobalContext()

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleFilePicker = (e) => {
    let file = e.target.files[0]
    let maxFileSize = 2 * 1024 * 1024

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        setErr("File must be less than 2mb")
        setSrc("")
        return
      }

      let reader = new FileReader()

      reader.onload = (e) => {
        setSrc(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setErr("Please select an image file")
      setSrc("")
    }
    // let url = URL.createObjectURL(file)
    // setSrc(url)
  }

  const handleEditProfile = async () => {
    setIsUpdating(true)

    if (userInfo.uName !== user.username) {
      let q = query(
        collection(db, "users"),
        where("username", "==", userInfo.uName)
      )
      let querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setIsUpdating(false)
        return setErr("Username already exists")
      }
    }

    let url = ""

    try {
      if (src) {
        await uploadString(
          ref(storage, `profilePics/${user.uid}`),
          src,
          "data_url"
        )
        url = await getDownloadURL(ref(storage, `profilePics/${user.uid}`))
      }

      const updatedProfile = {
        ...user,
        firstName: userInfo.fName || user.firstName,
        lastName: userInfo.lName || user.lastName,
        username: userInfo.uName || user.username,
        bio: userInfo.bio || user.bio,
        profilePicURL: url || user.profilePicURL,
        gender: genderRef.current.value || user.gender,
      }

      await updateDoc(doc(db, "users", user.uid), updatedProfile)
      localStorage.setItem("user", JSON.stringify(updatedProfile))
      setUser(updatedProfile)
      setIsUpdating(false)
      alert("Profile updated successfully...")
    } catch (err) {
      setErr(err.message)
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (user && user.username) {
      setUserInfo({
        fName: "" || user.firstName,
        lName: "" || user.lastName,
        uName: "" || user.username,
        bio: "" || user.bio,
      })
      genderRef.current.value = user.gender
    }
  }, [user])

  useEffect(() => {
    let id = setTimeout(() => {
      setErr("")
    }, 3000)
    return () => clearTimeout(id)
  }, [err])

  if (!user?.username) {
    return <section className="page edit-profile-page">Loading...</section>
  }

  let userProfile = `/user/${user.username}`

  return (
    <section className="page edit-profile-page">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <img
            src={src || user.profilePicURL || "/anonymous.jpg"}
            alt={user.username}
          />
          <label htmlFor="filePicker">Change photo</label>
          <input
            type="file"
            id="filePicker"
            accept="image/*"
            hidden
            onChange={handleFilePicker}
          />
        </div>
        <label htmlFor="firstName">
          <span>First Name</span>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            name="fName"
            value={userInfo.fName}
            onChange={(e) => handleInput(e)}
          />
        </label>
        <label htmlFor="lastName">
          <span>Last Name</span>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lName"
            value={userInfo.lName}
            onChange={(e) => handleInput(e)}
          />
        </label>
        <label htmlFor="username">
          <span>Username</span>
          <input
            id="username"
            type="text"
            placeholder="Username"
            name="uName"
            value={userInfo.uName}
            onChange={(e) => handleInput(e)}
          />
        </label>
        <label htmlFor="bio">
          <span>Bio</span>
          <textarea
            id="bio"
            placeholder="Bio"
            maxLength={150}
            name="bio"
            value={userInfo.bio}
            onChange={(e) => handleInput(e)}
          />
        </label>
        <label htmlFor="gender">
          <span>Gender</span>
          <select name="gender" id="gender" ref={genderRef}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <div>
          <Link to={userProfile}>Cancel</Link>
          <button onClick={handleEditProfile} disabled={isUpdating}>
            Submit
          </button>
        </div>
      </form>
      {err && <p className="err">{err}</p>}
    </section>
  )
}

export default EditProfilePage
