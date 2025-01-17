import React from "react";
import { Skeleton } from "./shadcn-ui/skeleton";

type IProps = {};

const PageSkeleton: React.FC<IProps> = () => {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default PageSkeleton;
