import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dimensions } from "react-native";
import Listing from "@/components/Listing";
import { View } from "@/components/Themed";
import * as MovieCard from "@/components/Cards/MovieCard";

const Trending = () => {
  const { data, isLoading, error } = useQuery<MovieCard.MovieCardProps[]>(
    "trending",
    () => {
      return axios
        .get("http://192.168.171.108:3000/movies")
        .then((response) => response.data);
    }
  );
  // CARD_WIDTH = (SCREEN_WIDTH - MAIN_CONTAINER_PADDING (LEFT + RIGHT) - LIST_CONTAINER_GAP) / 2
  const CARD_WIDTH = (Dimensions.get("screen").width - 55) / 2;

  return (
    <View style={{ flex: 1 }}>
      <Listing
        column="double"
        data={[]}
        card={({ item }) => <MovieCard.Card data={item} cardWidth={CARD_WIDTH} />}
      />
    </View>
  );
};

export default Trending;
