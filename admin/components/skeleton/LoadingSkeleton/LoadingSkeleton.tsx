import CardFullSkeleton from "../CardFullSkeleton";

interface LoadingSkeletonProps {}

export default function LoadingSkeleton(props: LoadingSkeletonProps) {
  return (
    <div className="flex flex-col items-center justify-center">
        <CardFullSkeleton/>
        <CardFullSkeleton/>
        <CardFullSkeleton/>
    </div>
  );
}
