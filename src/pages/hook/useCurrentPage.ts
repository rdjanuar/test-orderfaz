import { http } from "~/lib";
import { useDebounce } from "~/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Country } from "~/@types";

export const useCurrentPage = () => {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 350);
  const [isFocus, setIsFocus] = useState(false);

  const event = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    handleFocus: () => setIsFocus(true),
    handleBlur: () => setIsFocus(false),
  };

  const { data, isFetching, error } = useQuery<Country>({
    queryFn: () =>
      http("GET", {
        url: `name/${debounceValue ?? ""}`,
      }),
    queryKey: ["country", debounceValue],
    enabled: !!debounceValue,
    cacheTime: 0,
    select: (data) => (data.length >= 5 ? data.slice(0, 5) : data),
  });

  return {
    isFetching,
    search,
    data,
    error,
    event,
    isFocus,
    debounceValue,
  };
};
