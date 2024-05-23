import { NotificationsLogo, CommentLogo } from "../../assets/constants"
import { FaTrash } from "react-icons/fa6"
import Comments from "../Comments/Comments"
import { FaTimes } from "react-icons/fa"
import { useState } from "react"
import { useGlobalContext } from "../../Context"

const ProfilePost = ({ post }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const { profile } = useGlobalContext()

  const openModal = () => setIsModalShown(true)
  const closeModal = () => setIsModalShown(false)

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
          <FaTrash className="mb-trash" />
        </div>
        <section className="profile-modal">
          <img src={post.imageUrl} alt="post" />
          <div className="modal-comment">
            <div className="modal-header">
              <div>
                <img src={profile.profilePicURL} alt={profile?.username} />
                <p>{profile?.username}</p>
              </div>
              <FaTrash />
            </div>
            <Comments />
            <div className="modal-footer">
              <div>
                <NotificationsLogo />
                <CommentLogo />
              </div>
              <div>
                <span>{post.likes.length}</span>
                <span>likes</span>
              </div>
              <p>2d ago</p>
              <form>
                <input type="text" placeholder="Add a comment..." />
                <button>Post</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProfilePost
