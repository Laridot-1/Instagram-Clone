import {
  InstagramLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/constants"

const MBHeader = ({ toggleSearchModal }) => {
  return (
    <header className="mb-header">
      <div className="logo">
        <InstagramLogo />
      </div>
      <div>
        <button onClick={toggleSearchModal}>
          <SearchLogo />
        </button>
        <NotificationsLogo />
      </div>
    </header>
  )
}

export default MBHeader
