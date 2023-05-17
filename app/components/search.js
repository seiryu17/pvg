import { listPhotoState } from "@/atoms/listPhotoAtom";
import { pageState } from "@/atoms/pageAtom";
import { queryState } from "@/atoms/queryAtom";
import { unsplashApi } from "@/utils/api/unsplash-api";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

function Search() {
  const setData = useSetRecoilState(listPhotoState);
  const setQuery = useSetRecoilState(queryState);
  const [page, setPage] = useRecoilState(pageState);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    if (e.target.value !== "") {
      unsplashApi.search
        .getPhotos({ query: e.target.value, page: page, perPage: 8 })
        .then((result) => {
          if (result.response?.results?.length === 0) {
            setData({ errors: ["Photos not found with this keyword."] });
          } else {
            setData(result);
          }
        })
        .catch((res) => {
          if (res.message === "expected JSON response from server.") {
            return setData({ errors: ["You have exceeded Unsplah API limit"] });
          }
          setData({ errors: ["Failed to fetch from API"] });
        });
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  return (
    <>
      <label>Search: </label>
      <input onChange={debouncedResults} />
    </>
  );
}

export default Search;
