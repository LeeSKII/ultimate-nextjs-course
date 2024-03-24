import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function loading() {
  return (
    <div className="w-full">
      <Skeleton className="my-3 max-w-xs" />
      <Skeleton count={10} />
    </div>
  );
}
