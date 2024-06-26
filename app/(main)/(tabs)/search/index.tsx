import axios from "axios";
import { useQuery } from "react-query";
import Screen from "@/components/Screen";
import Listing from "@/components/Listing";
import SearchResultCard, {
  SearchDataProps,
} from "@/components/Cards/SearchResultCard";
import SearchBar from "@/components/SearchBar";
import React, { useState, useEffect } from "react";

const Search = React.memo(() => {
  const [searchText, setSearchText] = useState("");
  const [debounceSearchText, setDebounceSearchText] = useState("");

  const { data, isLoading, error } = useQuery<SearchDataProps[]>(
    ["searchresults", debounceSearchText],
    async () => {
      const response = await axios.get(
        `http://192.168.171.108:3000/movies?title=${debounceSearchText}`
      );
      return response.data;
    },
    { enabled: !!debounceSearchText }
  );

  console.log(data, isLoading);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearchText(searchText);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <Screen style={{ alignItems: "center", gap: 20 }}>
      <SearchBar onChangeText={(text) => setSearchText(text)} />
      <Listing
        column="single"
        data={data ?? []}
        card={({ item }) => <SearchResultCard data={item} />}
      />
    </Screen>
  );
});

export default Search;
