import { useEffect } from "react"
import { useGlobalContext } from "../../Context"

const SuggestedUser = ({ user }) => {
  const {
    User,
    user: ownProfile,
    isFollowing,
    setIsFollowing,
    isHandlingFollowing,
  } = useGlobalContext()

  const handleFollow = async () => {
    await User.followUser(user.uid)
  }

  useEffect(() => {
    if (user && ownProfile.uid !== user.uid) {
      let isFollowing = ownProfile.following.includes(user.uid)
      setIsFollowing(isFollowing)
    }
  }, [user, ownProfile])

  return (
    <article className="suggested-user">
      <div>
        <img
          src={user.profilePicURL}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div>
          <span>{`${user.firstName} ${user.lastName}`}</span>
          <span>{user.username}</span>
        </div>
      </div>
      {ownProfile?.uid !== user.uid && (
        <button onClick={handleFollow} disabled={isHandlingFollowing}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </article>
  )
}

export default SuggestedUser
