import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/constants"
import { TiHomeOutline } from "react-icons/ti"
import { FaHeart, FaHouse } from "react-icons/fa6"
import { FaSignOutAlt } from "react-icons/fa"
import { useGlobalContext } from "../../Context"

const TDSidebar = ({ user, toggleSearchModal }) => {
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
      alert("An error occured")
    }
  }

  return (
    <aside className="td-sidebar">
      <Link to="/" className="header">
        <InstagramMobileLogo />
        <InstagramLogo />
      </Link>

      <ul>
        <li>
          <Link to="/" className="tooltip">
            {pathname == "/" ? <FaHouse /> : <TiHomeOutline />}
            <span className="text">Home</span>
          </Link>
        </li>
        <li onClick={toggleSearchModal}>
          <Link to={null} className="tooltip">
            <SearchLogo />
            <span className="text">Search</span>
          </Link>
        </li>
        <li>
          <Link to={null} className="tooltip">
            {pathname == "/notifications" ? <FaHeart /> : <NotificationsLogo />}
            <span className="text">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to={null} className="tooltip">
            <CreatePostLogo />
            <span className="text">Create</span>
          </Link>
        </li>
        <li className={pathname == userProfile ? "profile  active" : "profile"}>
          <Link to={userProfile} className="tooltip">
            <img
              className="user"
              src={user?.profilePicURL || "/anonymous.jpg"}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <span className="text">Profile</span>
          </Link>
        </li>
      </ul>

      <button className="logout tooltip" onClick={handleLogout}>
        <FaSignOutAlt />
        <span className="text">Log out</span>
      </button>
    </aside>
  )
}

export default TDSidebar
