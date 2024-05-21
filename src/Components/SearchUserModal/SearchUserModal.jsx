import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import SuggestedUser from "../SuggestedUsers/SuggestedUser"
import SuggestedUserSkeleton from "../SuggestedUsers/SuggestedUserSkeleton"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase"

const SearchUserModal = ({ closeModal }) => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setUser(null)

    if (!username) return alert("Enter a username")

    setIsSearching(true)

    try {
      let q = query(collection(db, "users"), where("username", "==", username))
      let querySnapshot = await getDocs(q)

      if (querySnapshot.empty) return setIsSearching(false)

      querySnapshot.forEach((doc) => setUser(doc.data()))

      setIsSearching(false)
    } catch (err) {
      alert(err.message)
      setIsSearching(false)
    }
  }

  return (
    <section className="search-user-modal">
      <div className="header">
        <h3>Search User</h3>
        <button onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button disabled={isSearching}>Search</button>
      </form>
      {user && !isSearching && <SuggestedUser user={user} />}
      {!user && !isSearching && <p className="no-user">No user to show</p>}
      {!user && isSearching && <SuggestedUserSkeleton />}
    </section>
  )
}

export default SearchUserModal
