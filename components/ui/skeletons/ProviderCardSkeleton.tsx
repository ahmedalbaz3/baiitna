import { Skeleton } from "../Skeleton";

function ProviderCardSkeleton() {
  return (
    <div className="flex flex-col shadow-md rounded-xl overflow-hidden bg-white min-h-[440px] border border-gray-100">
      <Skeleton className="h-[264px] w-full rounded-none" />

      <div className="desc flex flex-col justify-between flex-1 p-4 pb-0 relative">
        <div className="absolute top-[-30px] left-4 border-2 border-white rounded-2xl overflow-hidden bg-white">
          <Skeleton className="w-[60px] h-[60px] rounded-lg" />
        </div>

        <div className=" space-y-1 pt-7">
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        <div className="bottom flex justify-between items-center mt-auto">
          <ul className="flex gap-3 py-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </ul>

          <Skeleton className="h-5 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default ProviderCardSkeleton;
