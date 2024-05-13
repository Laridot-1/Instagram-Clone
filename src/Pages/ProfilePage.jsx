import TDProfileHeader from "../Components/TabletAndDesktopProfileHeader/TDProfileHeader"
import MBProfileHeader from "../Components/MobileProfileHeader/MBProfileHeader"
import ProfilePosts from "../Components/ProfilePosts/ProfilePosts"
import { useGlobalContext } from "../Context"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const ProfilePage = () => {
  const { uid } = useParams()
  const { User } = useGlobalContext()

  useEffect(() => {
    User.getUserProfile(uid)
  }, [uid])

  return (
    <section className="page profile-page">
      <TDProfileHeader />
      <MBProfileHeader />
      <ProfilePosts />
    </section>
  )
}

export default ProfilePage
