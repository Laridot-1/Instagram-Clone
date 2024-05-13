import { NotificationsLogo, CommentLogo } from "../../assets/constants"
import { FaTrash } from "react-icons/fa6"
import Comments from "../Comments/Comments"
import { FaTimes } from "react-icons/fa"
import { useState } from "react"
import ProfilePostSkeleton from "./ProfilePostSkeleton"

const ProfilePost = () => {
  const [isModalShown, setIsModalShown] = useState(false)

  const openModal = () => setIsModalShown(true)
  const closeModal = () => setIsModalShown(false)

  return (
    <>
      <section className="profile-post" onClick={openModal}>
        <img src="/img1.png" alt="post" />
        <div className={isModalShown ? "overlay overlay-hide" : "overlay"}>
          <div>
            <NotificationsLogo />
            <span>24,376</span>
          </div>
          <div>
            <CommentLogo />
            <span>3,674</span>
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
        <FaTimes onClick={closeModal} />
        <section className="profile-modal">
          <img src="/img1.png" alt="post" />
          <div className="modal-comment">
            <div className="modal-header">
              <div>
                <img src="/profilepic.png" alt="profile pic" />
                <p>username</p>
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
                <span>24,376</span>
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
