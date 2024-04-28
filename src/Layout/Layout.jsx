import React from "react"
import { Outlet } from "react-router-dom"
import TDSidebar from "../Components/TDSidebar"
import MBHeader from "../Components/MBHeader"
import MBNavbar from "../Components/MBNavbar"

const Layout = () => {
  return (
    <section className="layout-wrapper">
      {/* Mobile header */}
      <MBHeader />

      {/* Mobile Navbar */}
      <MBNavbar />

      {/* Tablet and Desktop sidebar */}
      <TDSidebar />

      {/* Pages */}
      <Outlet />
    </section>
  )
}

export default Layout
