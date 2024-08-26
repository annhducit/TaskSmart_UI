type LoadingSkeletonType = {
  width?: string;
  height: string;
  borderRadius?: string;
  className?: string;
};

function LoadingSkeleton({ width, height, borderRadius, className }: LoadingSkeletonType) {
  return (
    <div
      className={`skeleton ${className} bg-gray-400`}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    ></div>
  );
}

export default LoadingSkeleton;
