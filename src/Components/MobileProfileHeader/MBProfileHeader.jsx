import { useGlobalContext } from "../../Context"
import MBProfileHeaderSkeleton from "./MBProfileHeaderSkeleton"

const MBProfileHeader = () => {
  const { profile, isFetchingProfile, user } = useGlobalContext()
  const visitingOwnProfile = user && user?.username === profile?.username
  const visitingAnotherProfile = user && user?.username !== profile?.username

  if (!profile && !isFetchingProfile) {
    return null
  }

  if (!profile) {
    return <MBProfileHeaderSkeleton />
  }

  return (
    <section className="mb-profile-header">
      <div>
        <img src="/profilepic.png" alt="user" />
        <div>
          <p>{profile.username}</p>
          {visitingOwnProfile && <button>Edit Profile</button>}
          {visitingAnotherProfile && <button>Follow</button>}
        </div>
      </div>
      <div>
        <span>{profile.fullName}</span>
        <span>{profile.bio}</span>
      </div>
      <div>
        <p>
          <span>{profile.posts.length}</span>
          <span>Posts</span>
        </p>
        <p>
          <span>{profile.followers.length}</span>
          <span>Followers</span>
        </p>
        <p>
          <span>{profile.following.length}</span>
          <span>Following</span>
        </p>
      </div>
    </section>
  )
}

export default MBProfileHeader
