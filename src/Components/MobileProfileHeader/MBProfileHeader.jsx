import { Link } from "react-router-dom"
import { useGlobalContext } from "../../Context"
import MBProfileHeaderSkeleton from "./MBProfileHeaderSkeleton"
import { useEffect } from "react"

const MBProfileHeader = () => {
  const {
    profile,
    isFetchingProfile,
    user,
    isFollowing,
    setIsFollowing,
    isHandlingFollowing,
    User,
  } = useGlobalContext()

  const visitingOwnProfile = user && user?.username === profile?.username
  const visitingAnotherProfile = user && user?.username !== profile?.username

  const handleFollow = async () => {
    await User.followUser(profile?.uid)
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

  if (!profile) {
    return <MBProfileHeaderSkeleton />
  }

  return (
    <section className="mb-profile-header">
      <div>
        <img
          src={profile.profilePicURL || "/anonymous.jpg"}
          alt={`${profile.firstName} ${profile.lastName}`}
        />
        <div>
          <p>{profile.username}</p>
          {visitingOwnProfile && <Link to="/edit-profile">Edit Profile</Link>}
          {visitingAnotherProfile && (
            <button disabled={isHandlingFollowing} onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <div>
        <span>{`${profile.firstName} ${profile.lastName}`}</span>
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
