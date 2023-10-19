import { useState, useEffect } from "react";

const useSearch = (data: any) => {
  const [query, setQuery] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSearching(true);
  };
  useEffect(() => {
    setSearching(false);
  }, [query]);

  return { query, handleSearch, filteredData, searching };
};

export default useSearch;
