import Skeleton from "react-loading-skeleton"

const TDProfileHeaderSkeleton = () => {
  return (
    <div
      style={{
        gap: "4rem",
        alignItems: "center",
        paddingBottom: "1rem",
        borderBottom: "1.5px solid var(--border)",
      }}
      className="td-skeleton"
    >
      <Skeleton circle width="10rem" height="10rem" baseColor="var(--border)" />
      <div style={{ width: "100%" }}>
        <Skeleton count={4} style={{ marginBottom: "0.5rem" }} />
      </div>
    </div>
  )
}

export default TDProfileHeaderSkeleton
