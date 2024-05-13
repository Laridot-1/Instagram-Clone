import { useGlobalContext } from "../../Context"
import ProfilePost from "./ProfilePost"
import ProfilePostSkeleton from "./ProfilePostSkeleton"
import ErrorPage from "../../Pages/ErrorPage"

const ProfilePosts = () => {
  const { profile, isFetchingProfile } = useGlobalContext()

  if (!profile && !isFetchingProfile) {
    return <ErrorPage />
  }

  return (
    <section className="profile-posts">
      {!profile && isFetchingProfile ? (
        Array(4)
          .fill(" ")
          .map((_, i) => {
            return <ProfilePostSkeleton key={i} />
          })
      ) : (
        <ProfilePost />
      )}
    </section>
  )
}

export default ProfilePosts
