import useQueryChangeHandle from "@/hooks/useQueryChangeHandle";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import React from "react";
import { Button } from "./shadcn-ui/button";
import { Input } from "./shadcn-ui/input";

type IProps = {};

const SearchBar: React.FC<IProps> = () => {
  const { query } = useTypedSelector((state) => state.payments);
  const setQueryItem = useQueryChangeHandle();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryItem("page", "1");
    setQueryItem("search", e.target.value);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        value={query.search}
        onChange={handleSearch}
        placeholder="Search by description"
      />
      <Button type="submit">Subscribe</Button>
    </div>
  );
};

export default SearchBar;
