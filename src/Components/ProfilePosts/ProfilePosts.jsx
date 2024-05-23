import { useGlobalContext } from "../../Context"
import ProfilePost from "./ProfilePost"
import ProfilePostSkeleton from "./ProfilePostSkeleton"
import ErrorPage from "../../Pages/ErrorPage"
import { useEffect } from "react"

const ProfilePosts = () => {
  const { posts, isFetchingPost, User, profile, isFetchingProfile } =
    useGlobalContext()

  useEffect(() => {
    User.getPosts()
  }, [profile])

  if (!profile && !isFetchingProfile) {
    return <ErrorPage />
  }

  if (!isFetchingPost && posts.length < 1) {
    return <p className="no-post-found">No posts found.</p>
  }

  return (
    <section className="profile-posts">
      {isFetchingPost
        ? Array(3)
            .fill(" ")
            .map((_, i) => {
              return <ProfilePostSkeleton key={i} />
            })
        : posts.map((post) => {
            return <ProfilePost post={post} key={post.id} />
          })}
    </section>
  )
}

export default ProfilePosts
