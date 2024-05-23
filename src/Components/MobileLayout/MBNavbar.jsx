import { useLocation, Link, useNavigate } from "react-router-dom"
import { CreatePostLogo } from "../../assets/constants"
import { FaHouse } from "react-icons/fa6"
import { TiHomeOutline } from "react-icons/ti"
import { FaSignOutAlt } from "react-icons/fa"
import { useGlobalContext } from "../../Context"

const MBNavbar = ({ user, toggleCreateModal }) => {
  const { pathname } = useLocation()
  const { Auth, setUser } = useGlobalContext()
  const navigate = useNavigate()

  let userProfile = `user/${user?.username}`

  const handleLogout = async () => {
    try {
      await Auth.signout()
      setUser(null)
      localStorage.removeItem("user")
      navigate("/accounts")
    } catch (err) {
      alert("An unknown error occured")
    }
  }

  return (
    <ul className="mb-navbar">
      <li>
        <Link to="/">{pathname == "/" ? <FaHouse /> : <TiHomeOutline />}</Link>
      </li>
      <li onClick={toggleCreateModal}>
        <Link to={null}>
          <CreatePostLogo />
        </Link>
      </li>
      <li className="mb-logout" onClick={handleLogout}>
        <FaSignOutAlt />
      </li>
      <li className={pathname == userProfile ? "profile active" : "profile"}>
        <Link to={userProfile}>
          <img
            className="user"
            src={user?.profilePicURL || "/anonymous.jpg"}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
        </Link>
      </li>
    </ul>
  )
}

export default MBNavbar
