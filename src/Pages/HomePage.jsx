import { useOutletContext } from "react-router-dom"
import FeedPosts from "../Components/FeedPosts/FeedPosts"
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers"
import SearchUserModal from "../Components/SearchUserModal/SearchUserModal"
import CreatePostModal from "../Components/CreatePostModal/CreatePostModal"

const HomePage = () => {
  const { isShown, closeModal, isCreateModal, closeCreateModal } =
    useOutletContext()

  return (
    <section className="page homepage">
      <FeedPosts />
      {isShown && <SearchUserModal closeModal={closeModal} />}
      {isCreateModal && <CreatePostModal closeModal={closeCreateModal} />}
      <SuggestedUsers />
    </section>
  )
}

export default HomePage
