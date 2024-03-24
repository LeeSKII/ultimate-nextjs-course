import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function loading() {
  return (
    <div className="max-w-2xl">
      <Skeleton className="mb-3 max-w-10" />
      <Skeleton count={20} />
    </div>
  );
}
