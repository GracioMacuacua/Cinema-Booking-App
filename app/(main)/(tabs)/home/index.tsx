import {
  StyleSheet,
  Dimensions,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import axios from "axios";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useQuery } from "react-query";
import Colors from "@/constants/Colors";
import Avatar from "@/components/Avatar";
import Screen from "@/components/Screen";
import { Octicons } from "@expo/vector-icons";
import SearchBar from "@/components/SearchBar";
import { Text, View } from "@/components/Themed";
import * as MovieCard from "@/components/Cards/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExtendedButton, LinkButton } from "@/components/Button";

const GENRES = [
  { key: "Romance", value: require("../../../../assets/images/romance.png") },
  { key: "Comédia", value: require("../../../../assets/images/comedy.png") },
  { key: "Terror", value: require("../../../../assets/images/horror.png") },
  { key: "Drama", value: require("../../../../assets/images/drama.png") },
  {
    key: "Aventura",
    value: require("../../../../assets/images/adventure.png"),
  },
];

const fetchMovies = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Home = () => {
  const colorScheme = useColorScheme();
  const {
    data: latestMovies,
    isLoading: isLoadingLatest,
    error: errorLatest,
  } = useQuery<MovieCard.MovieCardProps[]>("latestmovies", () =>
    fetchMovies(process.env.EXPO_PUBLIC_API_URL + "/movies?_page=0&_limit=5")
  );
  const {
    data: trendingMovies,
    isLoading: isLoadingTrending,
    error: errorTrending,
  } = useQuery<MovieCard.MovieCardProps[]>("trendingmovies", () =>
    fetchMovies(process.env.EXPO_PUBLIC_API_URL + "/movies?_start=4&_end=8")
  );

  const HOURS = new Date().getHours();

  return (
    <Screen>
      <View style={styles.header}>
        <Avatar
          avatar={"https://avatars.githubusercontent.com/u/100930639?v=4"}
        />
        <View style={{ justifyContent: "space-between", flexGrow: 1 }}>
          <Text lightColor="#000" style={styles.text}>
            Olá,{" "}
            <Text style={[styles.text, { fontFamily: "PoppinsBold" }]}>
              Grácio!
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: Colors.baseColors.border,
            }}
          >
            {HOURS < 12 ? "Bom dia" : HOURS < 18 ? "Boa tarde" : "Boa noite"}!
          </Text>
        </View>
        <LinkButton
          href="/notifications"
          icon={() => (
            <Octicons
              name="bell"
              size={24}
              color={Colors[colorScheme as "light" | "dark"].text}
            />
          )}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
      <View style={styles.searchBar}>
        <SearchBar wrapperStyle={{ flex: 1 }} />
        <ExtendedButton
          icon={({ color }) => (
            <Image
              source={require("../../../../assets/images/filtericon.png")}
              style={{ width: 24, height: 24 }}
            />
          )}
          style={{
            backgroundColor: Colors.baseColors.button,
            borderWidth: 0,
          }}
        />
      </View>
      <View style={styles.content}>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Categoria</Text>
            <Link href="/categories" style={styles.link}>
              Ver tudo
            </Link>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.genresContainer}
            showsHorizontalScrollIndicator={false}
          >
            {GENRES.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreItem}>
                <Image
                  source={genre.value}
                  style={[
                    styles.genreImage,
                    {
                      backgroundColor:
                        colorScheme === "light" ? "#FBFAFA" : "#1B1415",
                    },
                  ]}
                />
                <Text>{genre.key}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Últimos Filmes</Text>
            <Link href="/latestmovies" style={styles.link}>
              Ver tudo
            </Link>
          </View>
          <ScrollView
            horizontal
            style={{
              marginHorizontal: -15,
            }}
            contentContainerStyle={styles.movieScroll}
            showsHorizontalScrollIndicator={false}
          >
            {isLoadingLatest ? (
              <>
                <View />
                <MovieCard.Loader
                  width={Dimensions.get("screen").width * 0.6}
                  count={3}
                />
              </>
            ) : errorLatest ? (
              <Text style={styles.errorText}>
                Ocorreu um erro ao carregar os filmes
              </Text>
            ) : (
              <>
                <View />
                {latestMovies?.map((movie) => (
                  <MovieCard.Card key={movie.id} data={movie} />
                ))}
              </>
            )}
          </ScrollView>
        </View>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Filmes Mais Assistidos</Text>
            <Link href="/trendingmovies" style={styles.link}>
              Ver tudo
            </Link>
          </View>
          <ScrollView
            horizontal
            style={{
              marginHorizontal: -15,
            }}
            contentContainerStyle={styles.movieScroll}
            showsHorizontalScrollIndicator={false}
          >
            {isLoadingTrending ? (
              <>
                <View />
                <MovieCard.Loader
                  width={Dimensions.get("screen").width * 0.35}
                  count={3}
                />
              </>
            ) : errorTrending ? (
              <Text style={styles.errorText}>
                Ocorreu um erro ao carregar os filmes
              </Text>
            ) : (
              <>
                <View />
                {trendingMovies?.map((movie) => (
                  <MovieCard.Card
                    key={movie.id}
                    data={movie}
                    cardWidth={Dimensions.get("screen").width * 0.35}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  searchBar: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    gap: 10,
  },
  content: {
    gap: 10,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  link: {
    fontFamily: "PoppinsRegular",
    color: Colors.baseColors.button,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genresContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 10,
  },
  genreItem: {
    gap: 10,
    alignItems: "center",
  },
  genreImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  movieScroll: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
});
