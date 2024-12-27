import useQueryChangeHandle from "@/hooks/useQueryChangeHandle";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ReactNode } from "react";
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

type IProps = {
  totalCount: number;
};

const DynamicPagination: React.FC<IProps> = ({ totalCount }) => {
  const { query } = useTypedSelector((state) => state.payments);
  const setQueryItem = useQueryChangeHandle();

  const totalPageCount = Math.ceil(totalCount / query.limit!);

  const handlePageSizeChange = (limit: number) => {
    setQueryItem("limit", limit.toString());
  };

  const handlePageChange = (page: number) => {
    setQueryItem("page", page.toString());
  };

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={query.page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={query.page === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (query.page! > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, query.page! - 1);
      const end = Math.min(totalPageCount - 1, query.page! + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={query.page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (query.limit! < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      {
        totalPageCount &&
          items.push(
            <PaginationItem key={totalPageCount}>
              <PaginationLink
                onClick={() => handlePageChange(totalPageCount)}
                isActive={query.page === totalPageCount}
              >
                {totalPageCount}
              </PaginationLink>
            </PaginationItem>
          );
      }
    }

    return items;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center w-full">
      <div className="flex flex-col gap-4 flex-1">
        <SelectPerPage
          options={[5, 10, 15]}
          pageSize={query.limit!}
          setPageSize={handlePageSizeChange}
        />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={query.page === 1}
              tabIndex={query.page === 1 ? -1 : undefined}
              className={
                query.page === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => handlePageChange(query.page! - 1)}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              aria-disabled={query.page === totalPageCount}
              tabIndex={query.page === totalPageCount ? -1 : undefined}
              className={
                query.page === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => handlePageChange(query.page! + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DynamicPagination;
