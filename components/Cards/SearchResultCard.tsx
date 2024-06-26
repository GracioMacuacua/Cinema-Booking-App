import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View, Text } from "../Themed";
import Colors from "@/constants/Colors";
import { MovieCardProps } from "./MovieCard";
import { StyleSheet, TouchableOpacity } from "react-native";

export type SearchDataProps = MovieCardProps & {
  language: string[];
};

const Card = React.memo(({ data }: { data: SearchDataProps }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "/moviedetails", params: { id: data.id } });
      }}
    >
      <View style={styles.container} darkColor="#1B1415">
        <Image source={data.cover} style={styles.image} contentFit="cover" />
        <View style={[styles.column, { backgroundColor: "transparent" }]}>
          <Text style={styles.text}>{data.title}</Text>
          <Text style={styles.lightText}>{data.origin}</Text>
          <View
            style={{ flexDirection: "row", backgroundColor: "transparent" }}
          >
            <Text style={styles.text}>Língua: </Text>
            <Text style={[styles.text, { flex: 1 }]}>
              {data.language.join(", ")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});



export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    gap: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  lightText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: Colors.baseColors.border,
  },
});
