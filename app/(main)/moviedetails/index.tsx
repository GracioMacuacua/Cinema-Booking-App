import { Image } from "expo-image";
import { useQuery } from "react-query";
import Colors from "@/constants/Colors";
import Screen from "@/components/Screen";
import { Text, View } from "@/components/Themed";
import React, { PropsWithChildren } from "react";
import { ExtendedButton } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { MovieCardProps } from "@/components/Cards/MovieCard";

const ColumnItem = ({ children }: PropsWithChildren) => {
  return (
    <View lightColor="#FBFAFA" darkColor="#1B1415" style={styles.columnItem}>
      {children}
    </View>
  );
};

interface MovieProps extends MovieCardProps {
  genre: string;
  duration: string;
  classification: string;
  sinopsis: string;
}

const Movie = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<MovieProps>("movie", () => {
    return axios
      .get(process.env.EXPO_PUBLIC_API_URL + `/movies/${id}`)
      .then((response) => response.data);
  });
  const CARD_WIDTH = Dimensions.get("screen").width * 0.65;

  const handlePress = () => {
    router.push({ pathname: "/selectseats", params: { movieId: id } });
  };

  return (
    <Screen
      style={{
        gap: 15,
        paddingBottom: 15,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Image
          source={data?.cover}
          style={[
            {
              width: CARD_WIDTH,
              height: CARD_WIDTH + 40,
            },
            styles.cover,
          ]}
          contentFit="cover"
        />
        <View style={styles.column}>
          <ColumnItem>
            <Ionicons
              name="videocam-outline"
              color={Colors.baseColors.button}
              size={32}
            />
            <Text style={styles.columnItemText}>Gênero</Text>
            <Text style={styles.bold}>{data?.genre}</Text>
          </ColumnItem>

          <ColumnItem>
            <MaterialIcons
              name="access-time"
              color={Colors.baseColors.button}
              size={32}
            />
            <Text style={styles.columnItemText}>Duração</Text>
            <Text style={styles.bold}>{data?.duration}</Text>
          </ColumnItem>

          <ColumnItem>
            <AntDesign
              name="staro"
              color={Colors.baseColors.button}
              size={32}
            />
            <Text style={styles.columnItemText}>Pontuação</Text>
            <Text style={styles.bold}>{data?.classification}</Text>
          </ColumnItem>
        </View>
      </View>
      <View>
        <Text style={styles.title}>{data?.title}</Text>
        {/* <Text style={[styles.columnItemText, { fontSize: 16 }]}>{}</Text> */}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>Sinopse</Text>
        <Text style={styles.sinopsis}>{data?.sinopsis}</Text>
      </View>
      <ExtendedButton
        text="Selecionar Assento"
        style={{
          backgroundColor: Colors.baseColors.button,
          borderColor: "transparent",
        }}
        textStyle={{
          color: Colors.baseColors.text,
        }}
        onPress={handlePress}
      />
    </Screen>
  );
};

export default Movie;

const styles = StyleSheet.create({
  cover: {
    borderRadius: 20,
  },
  column: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnItem: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    gap: 1,
    borderRadius: 10,
    aspectRatio: 1,
  },
  columnItemText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: Colors.baseColors.border,
  },
  bold: {
    fontFamily: "PoppinsBold",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  sinopsis: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    textAlign: "justify",
  },
});
