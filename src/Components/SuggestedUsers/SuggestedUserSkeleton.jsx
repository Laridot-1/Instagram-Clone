import Skeleton from "react-loading-skeleton"

const SuggestedUserSkeleton = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Skeleton circle width="2rem" height="2rem" />
      <div style={{ width: "100%" }}>
        <Skeleton />
      </div>
    </div>
  )
}

export default SuggestedUserSkeleton
