import { useCallback } from "react";
import { useSearchParams } from "react-router";

const useQueryChangeHandle = () => {
  const [_, setSearchParams] = useSearchParams();

  const handle = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(location.search);

    params.set(key, value);

    if (!value) {
      params.delete(key, value);
    }

    setSearchParams(params);
  }, []);

  return handle;
};

export default useQueryChangeHandle;
