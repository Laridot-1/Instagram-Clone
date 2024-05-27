import { useRef } from "react"
import { useGlobalContext } from "../../Context"
import Comments from "../Comments/Comments"
import { FaTimes } from "react-icons/fa"

const CommentsModal = ({ closeModal, post }) => {
  const { User, isCommenting } = useGlobalContext()
  const commentRef = useRef(null)

  const handleComment = async () => {
    await User.addComment(post.id, commentRef.current.value)
    commentRef.current.value = ""
  }

  return (
    <section className="feedpost-comments-modal-overlay">
      <div className="feedpost-comments-modal">
        <div className="header">
          <h2>Comments</h2>
          <button onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <div className="feedpost-comments-modal-body">
          <div className="body">
            <Comments comments={post.comments} />
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Add a comment..."
              ref={commentRef}
            />
            <button onClick={handleComment} disabled={isCommenting}>
              Post
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CommentsModal
