import { useEffect, useState } from "react"
import { useGlobalContext } from "../../Context"
import TDProfileHeaderSkeleton from "./TDProfileHeaderSkeleton"
import { Link } from "react-router-dom"

const TDProfileHeader = () => {
  const { profile, isFetchingProfile, user, User } = useGlobalContext()

  const [isFollowing, setIsFollowing] = useState(false)
  const [isHandlingFollowing, setIsHandlingFollowing] = useState(false)

  const visitingOwnProfile = user?.username === profile?.username
  const visitingAnotherProfile = user?.username !== profile?.username

  const handleFollow = async () => {
    await User.followUser(
      profile?.uid,
      isFollowing,
      setIsFollowing,
      setIsHandlingFollowing
    )
  }

  useEffect(() => {
    if (visitingAnotherProfile) {
      let isFollowing = user.following.includes(profile?.uid)
      setIsFollowing(isFollowing)
    }
  }, [user, profile])

  if (!profile && !isFetchingProfile) {
    return null
  }

  if (!profile && isFetchingProfile) {
    return <TDProfileHeaderSkeleton />
  }

  return (
    <section className="td-profile-header">
      <img
        src={profile.profilePicURL || "/anonymous.jpg"}
        alt={`${profile.firstName} ${profile.lastName}`}
      />
      <div className="user-info">
        <div>
          <p>{profile.username}</p>
          {visitingOwnProfile && <Link to="/edit-profile">Edit Profile</Link>}
          {visitingAnotherProfile && (
            <button disabled={isHandlingFollowing} onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
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
          <span>{`${profile.firstName} ${profile.lastName}`}</span>
          <span>{profile.bio}</span>
        </div>
      </div>
    </section>
  )
}

export default TDProfileHeader
