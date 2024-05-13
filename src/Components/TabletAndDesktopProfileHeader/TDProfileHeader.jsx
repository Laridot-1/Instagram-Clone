import { useGlobalContext } from "../../Context"
import TDProfileHeaderSkeleton from "./TDProfileHeaderSkeleton"

const TDProfileHeader = () => {
  const { profile, isFetchingProfile, user } = useGlobalContext()
  const visitingOwnProfile = user && user?.username === profile?.username
  const visitingAnotherProfile = user && user?.username !== profile?.username

  if (!profile && !isFetchingProfile) {
    return null
  }

  if (!profile && isFetchingProfile) {
    return <TDProfileHeaderSkeleton />
  }

  return (
    <section className="td-profile-header">
      <img src="/profilepic.png" alt="user" />
      <div className="user-info">
        <div>
          <p>{profile.username}</p>
          {visitingOwnProfile && <button>Edit Profile</button>}
          {visitingAnotherProfile && <button>Follow</button>}
        </div>
        <div>
          <p>
            <span>{profile.posts.length} </span>
            <span>Posts</span>
          </p>
          <p>
            <span>{profile.followers.length} </span>
            <span>Followers</span>
          </p>
          <p>
            <span>{profile.following.length} </span>
            <span>Following</span>
          </p>
        </div>
        <div>
          <span>{profile.fullName}</span>
          <span>{profile.bio}</span>
        </div>
      </div>
    </section>
  )
}

export default TDProfileHeader
