import Skeleton from "react-loading-skeleton"

const CommentSkeleton = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Skeleton
        circle
        width="2rem"
        height="2rem"
        style={{ borderRadius: "50%" }}
      />
      <div style={{ width: "100%" }}>
        <Skeleton count={2} />
      </div>
    </div>
  )
}

export default CommentSkeleton
