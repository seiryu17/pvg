"use client";

import { unsplashApi } from "@/utils/api/unsplash-api";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { listPhotoState } from "@/atoms/listPhotoAtom";
import PhotoList from "./components/photo-list";
import InfiniteScroll from "react-infinite-scroll-component";
import { queryState } from "@/atoms/queryAtom";
import { pageState } from "@/atoms/pageAtom";

export default function Home() {
  const [data, setData] = useRecoilState(listPhotoState);
  const [page, setPage] = useRecoilState(pageState);
  const query = useRecoilValue(queryState);

  const fetchData = (page) => {
    unsplashApi.search
      .getPhotos({ query: query ? query : "random", page: page, perPage: 8 })
      .then((result) => {
        console.logr;
        if (page !== 1 && data?.response?.results?.length > 0) {
          return setData({
            ...data,
            response: {
              results: [...data.response.results, ...result.response.results],
            },
          });
        }
        setData(result);
      })
      .catch((res) => {
        if (res.message === "expected JSON response from server.") {
          return setData({ errors: ["You have exceeded Unsplah API limit"] });
        }
        setData({ errors: ["Failed to fetch from API"] });
      });
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return <div className="px-3">{data.errors[0]}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={page * 8}
      next={() => setPage(page + 1)}
      loader={<p>loading...</p>}
      hasMore={true}
    >
      <PhotoList data={data} />
    </InfiniteScroll>
  );
}
