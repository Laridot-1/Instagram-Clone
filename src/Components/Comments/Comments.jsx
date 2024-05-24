import Comment from "./Comment"

const Comments = ({ comments }) => {
  return (
    <section className="profile-comments">
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.createdAt} />
      })}
    </section>
  )
}

export default Comments
