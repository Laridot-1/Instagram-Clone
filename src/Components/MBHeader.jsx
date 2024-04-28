import React from "react"
import { InstagramLogo, NotificationsLogo } from "../assets/constants"

const MBHeader = () => {
  return (
    <header className="mb-header">
      <div className="logo">
        <InstagramLogo />
      </div>
      <div>
        <form>
          <input type="search" name="search" id="search" placeholder="Search" />
        </form>
        <NotificationsLogo />
      </div>
    </header>
  )
}

export default MBHeader
