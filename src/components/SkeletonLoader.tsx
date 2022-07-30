import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonLoader = (props: any) => (
  <ContentLoader 
    speed={3}
    width={800}
    height={800}
    viewBox="0 0 800 800"
    backgroundColor="#e8dede"
    foregroundColor="#ebe5e5"
    {...props}
  >
    <rect x="130" y="50" rx="12" ry="12" width="533" height="800" />
  </ContentLoader>
)

export default SkeletonLoader