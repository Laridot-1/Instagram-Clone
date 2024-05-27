import FeedPost from "./FeedPost"
import FeedPostSkeleton from "./FeedPostSkeleton"
import { useGlobalContext } from "../../Context"
import { useEffect } from "react"
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers"

const FeedPosts = () => {
  const { posts, User, user, isFetchingFeedPosts } = useGlobalContext()

  useEffect(() => {
    if (user) {
      User.getFeedPosts()
    }
  }, [user])

  if (!isFetchingFeedPosts && posts?.length < 1) {
    return (
      <section className="feedposts">
        <h3 className="no-post">
          No posts to show. Follow more users to see their posts.
        </h3>
        <div className="suggested-users">
          <SuggestedUsers />
        </div>
      </section>
    )
  }

  return (
    <section className="feedposts">
      {isFetchingFeedPosts
        ? Array(3)
            .fill(" ")
            .map((_, i) => {
              return <FeedPostSkeleton key={i} />
            })
        : posts?.map((post) => {
            if (post?.createdBy !== user?.uid) {
              return <FeedPost post={post} key={post.id} />
            }
          })}
    </section>
  )
}

export default FeedPosts
