import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dimensions } from "react-native";
import Listing from "@/components/Listing";
import { View } from "@/components/Themed";
import * as MovieCard from "@/components/Cards/MovieCard";

const LatestMovies = () => {
  const {
    data: latest,
    isLoading,
    error,
  } = useQuery<MovieCard.MovieCardProps[]>("latest", () => {
    return axios
      .get(process.env.EXPO_PUBLIC_API_URL + "/movies")
      .then((response) => response.data);
  });

  // CARD_WIDTH = (SCREEN_WIDTH - MAIN_CONTAINER_PADDING (LEFT + RIGHT) - LIST_CONTAINER_GAP) / 2
  const CARD_WIDTH = (Dimensions.get("screen").width - 55) / 2;

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            paddingTop: 15,
            paddingHorizontal: 20,
            gap: 15,
          }}
        >
          <MovieCard.Loader width={CARD_WIDTH} count={6} />
        </View>
      ) : (
        <Listing
          column="double"
          data={latest ?? []}
          card={({ item }) => (
            <MovieCard.Card data={item} cardWidth={CARD_WIDTH} />
          )}
        />
      )}
    </View>
  );
};

export default LatestMovies;
