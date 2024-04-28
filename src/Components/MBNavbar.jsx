import { useLocation, Link } from "react-router-dom"
import { CreatePostLogo } from "../assets/constants"
import { FaHouse } from "react-icons/fa6"
import { TiHomeOutline } from "react-icons/ti"

const MBNavbar = () => {
  const { pathname } = useLocation()

  return (
    <ul className="mb-navbar">
      <li>
        <Link to={null}>
          {pathname == "/" ? <FaHouse /> : <TiHomeOutline />}
        </Link>
      </li>
      <li>
        <Link to={null}>
          <CreatePostLogo />
        </Link>
      </li>
      <li className={pathname == "/profile" ? "profile active" : "profile"}>
        <Link to={null}>
          <img className="user" src="/anonymous.jpg" alt="user" />
        </Link>
      </li>
    </ul>
  )
}

export default MBNavbar
