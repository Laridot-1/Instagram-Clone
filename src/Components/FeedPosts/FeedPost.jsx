import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants"
import { useEffect, useRef, useState } from "react"
import { timeAgo } from "../../Utils/timeAgo"
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../firebase"
import FeedPostSkeleton from "./FeedPostSkeleton"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../../Context"
import CommentsModal from "./CommentsModal"

const FeedPost = ({ post }) => {
  const { User, user, isCommenting, posts, setPosts } = useGlobalContext()

  const [isFollowing, setIsFollowing] = useState(false)
  const [isHandlingFollowing, setIsHandlingFollowing] = useState(false)

  const [isGettingProfile, setIsGettingProfile] = useState(true)
  const [feedPostProfile, setFeedPostProfile] = useState(null)

  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.uid))
  const [isLiking, setIsLiking] = useState(false)

  const [comment, setComment] = useState("")
  const commentRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)

  const handleFollow = async () => {
    await User.followUser(
      feedPostProfile?.uid,
      isFollowing,
      setIsFollowing,
      setIsHandlingFollowing
    )
  }

  const handleComment = async () => {
    await User.addComment(post.id, comment)
    setComment("")
  }

  const handleLike = async () => {
    if (isLiking) return
    if (!user) return alert("You need to be logged in.")

    setIsLiking(true)

    try {
      await updateDoc(doc(db, "posts", post.id), {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      })
      setIsLiked(!isLiked)
      setPosts(
        posts.map((singlePost) => {
          if (singlePost.id === post.id) {
            return {
              ...singlePost,
              likes: isLiked
                ? singlePost.likes.filter((id) => id !== user.uid)
                : [...singlePost.likes, user.uid],
            }
          }
          return singlePost
        })
      )
      setIsLiking(false)
    } catch (err) {
      alert(err.message)
      setIsLiked(false)
    }
  }

  useEffect(() => {
    if (user && user.uid !== feedPostProfile?.uid) {
      let isFollowing = user.following.includes(feedPostProfile?.uid)
      setIsFollowing(isFollowing)
    }
  }, [user, feedPostProfile])

  useEffect(() => {
    const getProfile = async () => {
      setIsGettingProfile(true)

      try {
        let user = await getDoc(doc(db, "users", post.createdBy))
        setFeedPostProfile(user.data())
        setIsGettingProfile(false)
      } catch (err) {
        alert(err.message)
        setIsGettingProfile(false)
      }
    }
    getProfile()
  }, [])

  if (isGettingProfile) {
    return <FeedPostSkeleton />
  }

  let time

  if ("toDate" in post?.createdAt) {
    time = post.createdAt.toDate()
  }

  return (
    <article className="feedpost">
      <div className="post-heading">
        <div className="user">
          <Link to={`/user/${feedPostProfile.username}`}>
            <img
              src={feedPostProfile.profilePicURL}
              alt={feedPostProfile.username}
            />
          </Link>
          <div className="u-info">
            <Link to={`/user/${feedPostProfile.username}`}>
              <span>{feedPostProfile.username} </span>
            </Link>
            <span>• {timeAgo(time)}</span>
          </div>
        </div>
        {user?.uid !== feedPostProfile.uid && (
          <button onClick={handleFollow} disabled={isHandlingFollowing}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="post-content">
        <img src={post.imageUrl} />
      </div>
      <div className="post-footer">
        <div className="action-icons">
          <button
            style={{
              display: "flex",
              border: "0",
              outline: "0",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            onClick={handleLike}
          >
            {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
          </button>
          <button
            style={{
              display: "flex",
              border: "0",
              outline: "0",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            onClick={() => commentRef.current.focus()}
          >
            <CommentLogo />
          </button>
        </div>
        <p className="like-count">{post?.likes.length} likes</p>
        <div className="ucap">
          <span>{feedPostProfile.username} </span>
          <span>{post.caption}</span>
        </div>
        {post?.comments.length > 0 && (
          <button className="comments-count" onClick={() => setIsOpen(true)}>
            View all {post?.comments.length} comments
          </button>
        )}
        {isOpen ? <CommentsModal closeModal={closeModal} post={post} /> : ""}
        <form>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={commentRef}
          />
          <button onClick={handleComment} disabled={isCommenting}>
            Post
          </button>
        </form>
      </div>
    </article>
  )
}

export default FeedPost
