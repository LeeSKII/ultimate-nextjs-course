import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function loading() {
  return (
    <div className="w-full">
      <Skeleton className="mb-3 max-w-10" />
      <Skeleton count={30} />
    </div>
  );
}
