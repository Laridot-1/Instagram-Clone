import Skeleton from "react-loading-skeleton"

const MBProfileHeaderSkeleton = () => {
  return (
    <div className="mb-skeleton">
      <div
        style={{
          gap: "1rem",
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Skeleton circle width="5rem" height="5rem" baseColor="var(--border)" />
        <Skeleton width="10rem" />
      </div>
      <Skeleton count={3} style={{ marginBottom: "0.5rem" }} />
    </div>
  )
}

export default MBProfileHeaderSkeleton
