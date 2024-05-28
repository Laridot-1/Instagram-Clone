import { useEffect, useState } from "react"
import { useGlobalContext } from "../../Context"
import { Link } from "react-router-dom"

const SuggestedUser = ({ user }) => {
  const { User, user: ownProfile } = useGlobalContext()

  const [isFollowing, setIsFollowing] = useState(false)
  const [isHandlingFollowing, setIsHandlingFollowing] = useState(false)

  const handleFollow = async () => {
    await User.followUser(
      user.uid,
      isFollowing,
      setIsFollowing,
      setIsHandlingFollowing
    )
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
        <Link to={`/user/${user.username}`}>
          <img
            src={user.profilePicURL}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </Link>
        <div>
          <Link to={`/user/${user.username}`}>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </Link>
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
