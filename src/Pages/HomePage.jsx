import FeedPosts from "../Components/FeedPosts/FeedPosts"
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers"

const HomePage = () => {
  return (
    <section className="page homepage">
      <FeedPosts />
      <SuggestedUsers />
    </section>
  )
}

export default HomePage
