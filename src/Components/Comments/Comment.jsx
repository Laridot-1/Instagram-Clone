import { useEffect, useState } from "react"
import CommentSkeleton from "./CommentSkeleton"
import { Link } from "react-router-dom"
import { timeAgo } from "../../Utils/timeAgo"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"

const Comment = ({ comment }) => {
  const [commentProfile, setCommentProfile] = useState(null)
  const [isFetchingCommentProfile, setIsFetchingCommentProfile] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      setIsFetchingCommentProfile(true)

      try {
        let user = await getDoc(doc(db, "users", comment.createdBy))
        setCommentProfile(user.data())
        setIsFetchingCommentProfile(false)
      } catch (err) {
        alert(err.message)
        setIsFetchingCommentProfile(false)
      }
    }
    getProfile()
  }, [])

  if (isFetchingCommentProfile) {
    return <CommentSkeleton />
  }

  const userProfile = `/user/${commentProfile?.username}`

  return (
    <section className="profile-comment">
      <Link to={userProfile}>
        <img src={commentProfile.profilePicURL} alt={commentProfile.username} />
      </Link>
      <div>
        <div>
          <Link to={userProfile}>
            <p>{commentProfile.username}</p>
          </Link>
          <p>{comment.comment}</p>
        </div>
        <p>{timeAgo(comment.createdAt)}</p>
      </div>
    </section>
  )
}

export default Comment
