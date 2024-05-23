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
  const [isCreateModal, setIsCreateModal] = useState(false)

  if (user && !user.username) {
    User.getUser()
  }

  let fulluser =
    user && user.username ? user : JSON.parse(localStorage.getItem("user"))

  const toggleSearchModal = () => {
    if (isCreateModal) setIsCreateModal(false)
    setIsShown(!isShown)
  }
  const toggleCreateModal = () => {
    if (isShown) setIsShown(false)
    setIsCreateModal(!isCreateModal)
  }

  const closeModal = () => setIsShown(false)
  const closeCreateModal = () => setIsCreateModal(false)

  const val = {
    user,
    isShown,
    closeModal,
    isCreateModal,
    closeCreateModal,
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
      <MBNavbar user={fulluser} toggleCreateModal={toggleCreateModal} />

      {/* Tablet and Desktop sidebar */}
      {fulluser || pathname !== "/" ? (
        <TDSidebar
          user={fulluser}
          toggleSearchModal={toggleSearchModal}
          toggleCreateModal={toggleCreateModal}
        />
      ) : (
        ""
      )}

      {/* Pages */}
      <Outlet context={val} />
    </section>
  )
}

export default Layout
