import { Outlet, useLocation } from "react-router-dom"
import TDSidebar from "../Components/TabletAndDesktopLayout/TDSidebar"
import MBHeader from "../Components/MobileLayout/MBHeader"
import MBNavbar from "../Components/MobileLayout/MBNavbar"
import { useGlobalContext } from "../Context"
import { useState } from "react"

const Layout = () => {
  const { pathname } = useLocation()
  const { user, User } = useGlobalContext()

  const [isShown, setIsShown] = useState(false)

  if (user && !user.username) {
    User.getUser()
  }

  let fulluser =
    user && user.username ? user : JSON.parse(localStorage.getItem("user"))

  const toggleSearchModal = () => setIsShown(!isShown)

  const closeModal = () => setIsShown(false)

  const val = {
    user,
    isShown,
    closeModal,
  }

  return (
    <section className="layout-wrapper">
      {/* Mobile header */}
      {pathname == "/" ? (
        <MBHeader toggleSearchModal={toggleSearchModal} />
      ) : (
        ""
      )}

      {/* Mobile Navbar */}
      <MBNavbar user={fulluser} />

      {/* Tablet and Desktop sidebar */}
      {fulluser || pathname !== "/" ? (
        <TDSidebar user={fulluser} toggleSearchModal={toggleSearchModal} />
      ) : (
        ""
      )}

      {/* Pages */}
      <Outlet context={val} />
    </section>
  )
}

export default Layout
