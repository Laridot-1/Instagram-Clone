import { useOutletContext } from "react-router-dom"
import FeedPosts from "../Components/FeedPosts/FeedPosts"
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers"
import SearchUserModal from "../Components/SearchUserModal/SearchUserModal"

const HomePage = () => {
  const { isShown, closeModal } = useOutletContext()

  return (
    <section className="page homepage">
      <FeedPosts />
      {isShown && <SearchUserModal closeModal={closeModal} />}
      <SuggestedUsers />
    </section>
  )
}

export default HomePage
