import FeedPost from "./FeedPost"
import FeedPostSkeleton from "./FeedPostSkeleton"
import { useGlobalContext } from "../../Context"

const FeedPosts = () => {
  const { user } = useGlobalContext()

  return (
    <section className="feedposts">
      {!user ? (
        Array(4)
          .fill(" ")
          .map((_, i) => {
            return <FeedPostSkeleton key={i} />
          })
      ) : (
        <FeedPost
          likes="20,874"
          content="/img1.png"
          username="maria"
          comments="1,978"
        />
      )}
      {/* <FeedPost
        likes="2,308"
        content="/img2.png"
        username="lang67"
        comments="278"
      />
      <FeedPost
        likes="13,675"
        content="/img3.png"
        username="booklp67"
        comments="598"
      />
      <FeedPost
        likes="5,007"
        content="/img4.png"
        username="porche13"
        comments="1,076"
      /> */}
    </section>
  )
}

export default FeedPosts
