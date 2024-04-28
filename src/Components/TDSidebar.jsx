import { Link, useLocation } from "react-router-dom"
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../assets/constants"
import { TiHomeOutline } from "react-icons/ti"
import { FaHeart, FaHouse } from "react-icons/fa6"
import { FaSignOutAlt } from "react-icons/fa"

const TDSidebar = () => {
  const { pathname } = useLocation()

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
        <li>
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
        <li className={pathname == "/profile" ? "profile active" : "profile"}>
          <Link to={null} className="tooltip">
            <img className="user" src="/anonymous.jpg" alt="user" />
            <span className="text">Profile</span>
          </Link>
        </li>
      </ul>

      <Link to="accounts" className="logout tooltip">
        <FaSignOutAlt />
        <span className="text">Log out</span>
      </Link>
    </aside>
  )
}

export default TDSidebar
