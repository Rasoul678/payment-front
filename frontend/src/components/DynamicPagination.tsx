import useActions from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import SelectPerPage from "./SelectPerPage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./shadcn-ui/pagination";

const DynamicPagination = () => {
  const {
    query: { limit },
    error,
    payments,
  } = useTypedSelector((state) => state.default);
  const { setQueryParams } = useActions();

  const handlePageChange = (size: number) => {
    setQueryParams({ limit: size });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center w-full">
      <div className="flex flex-col gap-4 flex-1">
        <SelectPerPage
          options={[5, 10, 15]}
          pageSize={limit!}
          setPageSize={handlePageChange}
        />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DynamicPagination;
