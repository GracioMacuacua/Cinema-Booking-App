import axios from "axios";
import { useQuery } from "react-query";
import Screen from "@/components/Screen";
import Listing from "@/components/Listing";
import SearchResultCard, {
  SearchDataProps,
} from "@/components/Cards/SearchResultCard";
import SearchBar from "@/components/SearchBar";
import React, { useState, useEffect, useRef } from "react";
import { View } from "@/components/Themed";
import { TextInput } from "react-native";

const Search = React.memo(() => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState("");
  const [debounceSearchText, setDebounceSearchText] = useState("");

  const { data, isLoading, error } = useQuery<SearchDataProps[]>(
    ["searchresults", debounceSearchText],
    async () => {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_API_URL +
          `/movies?title_like=${debounceSearchText}`
      );
      return response.data;
    },
    { enabled: !!debounceSearchText }
  );

  useEffect(() => {
    return () => {
      setSearchText("");
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearchText(searchText);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <View
      style={{
        height: "100%",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SearchBar onChangeText={setSearchText} />
      <Listing
        column="single"
        data={data ?? []}
        card={({ item }) => <SearchResultCard data={item} />}
      />
    </View>
  );
});

export default Search;
