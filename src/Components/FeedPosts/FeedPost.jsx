import Skeleton from "react-loading-skeleton"
import { CommentLogo, NotificationsLogo } from "../../assets/constants"

const FeedPost = ({ username, likes, comments, content }) => {
  return (
    <article className="feedpost">
      <div className="post-heading">
        <div className="user">
          <img src={content} alt="user" />
          <div className="u-info">
            <span>{username} </span>
            <span>• 2w</span>
          </div>
        </div>
        <button>follow</button>
      </div>
      <div className="post-content">
        <img src={content} alt={username} />
      </div>
      <div className="post-footer">
        <div className="action-icons">
          <NotificationsLogo />
          <CommentLogo />
        </div>
        <p className="like-count">{likes} likes</p>
        <div className="ucap">
          <span>{username} </span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            debitis earum quasi et ullam praesentium iusto distinctio. Vel,
            cupiditate quo.
          </span>
        </div>
        <button className="comments-count">View all {comments} comments</button>
        <form>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment..."
          />
          <button>Post</button>
        </form>
      </div>
    </article>
  )
}

export default FeedPost
