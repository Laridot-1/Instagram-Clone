import Skeleton from "react-loading-skeleton"

const FeedPostShadow = () => {
  return (
    <div
      style={{
        gap: "0.5rem",
        width: "100%",
        margin: "auto",
        display: "flex",
        maxWidth: "450px",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Skeleton circle width="2rem" height="2rem" baseColor="var(--border)" />
        <Skeleton width="5rem" baseColor="var(--border)" />
      </div>
      <Skeleton height="450px" />
      <Skeleton count={5} style={{ marginBottom: "0.35rem" }} />
    </div>
  )
}

export default FeedPostShadow
