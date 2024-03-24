import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function loading() {
  return (
    <div className="max-w-xl">
      <Skeleton className="mb-3" />
      <Skeleton count={10} />
    </div>
  );
}
