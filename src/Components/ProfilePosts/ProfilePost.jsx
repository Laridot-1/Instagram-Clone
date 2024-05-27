import {
  NotificationsLogo,
  CommentLogo,
  UnlikeLogo,
} from "../../assets/constants"
import { FaTrash } from "react-icons/fa6"
import Comments from "../Comments/Comments"
import { FaTimes } from "react-icons/fa"
import { useRef, useState } from "react"
import { useGlobalContext } from "../../Context"
import { timeAgo } from "../../Utils/timeAgo"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

const ProfilePost = ({ post }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const { profile, user, User, isDeleting, isCommenting, posts, setPosts } =
    useGlobalContext()
  const [comment, setComment] = useState("")
  const commentRef = useRef(null)
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.uid))
  const [isLiking, setIsLiking] = useState(false)

  const openModal = () => setIsModalShown(true)
  const closeModal = () => setIsModalShown(false)

  const handleDelete = () => {
    User.deletePost(post.id)
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

  let time

  if ("toDate" in post.createdAt) {
    time = post.createdAt.toDate()
  }

  return (
    <>
      <section className="profile-post" onClick={openModal}>
        <div className="img-wrapper">
          <img src={post.imageUrl} alt="post" />
        </div>
        <div className={isModalShown ? "overlay overlay-hide" : "overlay"}>
          <div>
            <NotificationsLogo />
            <span>{post?.likes.length}</span>
          </div>
          <div>
            <CommentLogo />
            <span>{post?.comments.length}</span>
          </div>
        </div>
      </section>
      <div
        className={
          isModalShown
            ? "profile-modal-overlay modal-shown"
            : "profile-modal-overlay"
        }
      >
        <div className="icons">
          <FaTimes onClick={closeModal} />
          {user?.uid === profile?.uid && (
            <button onClick={handleDelete} disabled={isDeleting}>
              <FaTrash className="mb-trash" />
            </button>
          )}
        </div>
        <section className="profile-modal">
          <img src={post.imageUrl} alt="post" />
          <div className="modal-comment">
            <div className="modal-header">
              <div>
                <img src={profile?.profilePicURL} alt={profile?.username} />
                <p>{profile?.username}</p>
              </div>
              {user?.uid === profile?.uid && (
                <button onClick={handleDelete} disabled={isDeleting}>
                  <FaTrash />
                </button>
              )}
            </div>
            <div className="comment-body">
              <div className="caption">
                <p>{profile?.username}</p>
                <p>{post.caption}</p>
              </div>
              <Comments comments={post?.comments} />
            </div>
            <div className="modal-footer">
              <div>
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
              <div>
                <span>{post?.likes.length}</span>
                <span>likes</span>
              </div>
              <p>{timeAgo(time)}</p>
              {user && (
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    ref={commentRef}
                  />
                  <button onClick={handleComment} disabled={isCommenting}>
                    Post
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProfilePost
