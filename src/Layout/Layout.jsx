import { Outlet, useLocation } from "react-router-dom"
import TDSidebar from "../Components/TabletAndDesktopLayout/TDSidebar"
import MBHeader from "../Components/MobileLayout/MBHeader"
import MBNavbar from "../Components/MobileLayout/MBNavbar"
import { useGlobalContext } from "../Context"

const Layout = () => {
  const { pathname } = useLocation()
  const { user } = useGlobalContext()

  const fulluser = user || JSON.parse(localStorage.getItem("user"))

  return (
    <section className="layout-wrapper">
      {/* Mobile header */}
      {pathname == "/" ? <MBHeader /> : ""}

      {/* Mobile Navbar */}
      <MBNavbar user={fulluser} />

      {/* Tablet and Desktop sidebar */}
      {fulluser || pathname !== "/" ? <TDSidebar user={fulluser} /> : ""}

      {/* Pages */}
      <Outlet />
    </section>
  )
}

export default Layout
