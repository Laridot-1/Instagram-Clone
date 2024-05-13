import SuggestedUserSkeleton from "./SuggestedUserSkeleton"

const SuggestedUser = () => {
  return (
    <article className="suggested-user">
      <div>
        <img src="/img1.png" alt="user" />
        <span>username</span>
      </div>
      <button>follow</button>
    </article>
  )
}

export default SuggestedUser
