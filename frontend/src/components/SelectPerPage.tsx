import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn-ui/select";

type IProps = {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
};

const SelectPerPage: React.FC<IProps> = ({
  options,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="flex flex-row-reverse items-center gap-2">
      <span className="whitespace-nowrap text-sm">items per page</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select page size">
            {String(pageSize)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPerPage;
