import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "../Themed";
import Colors from "@/constants/Colors";
import { Skeleton } from "react-native-skeletons";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

type MovieCardProps = {
  id: string;
  cover: string;
  title: string;
  origin: string;
};

const Card = React.memo(
  ({ data, cardWidth }: { data: MovieCardProps; cardWidth?: number }) => {
    const CARD_WIDTH = cardWidth || Dimensions.get("screen").width * 0.6;

    const handlePress = () => {
      router.push({ pathname: "/moviedetails", params: { id: data.id } });
    };

    return (
      <TouchableOpacity
        style={[styles.container, { width: CARD_WIDTH }]}
        onPress={handlePress}
      >
        <View>
          <Image
            source={data.cover}
            style={{
              height: CARD_WIDTH + 25,
              borderRadius: 18,
            }}
            contentFit="cover"
          />
        </View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.text}>{data.origin}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const Loader = ({ width, count }: { width: number; count: number }) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <View style={{ gap: 10 }} key={i}>
            <Skeleton width={width} height={width + 20} borderRadius={18} />
            <Skeleton width={width - 50} height={12} />
            <Skeleton width={width - 100} height={10} />
          </View>
        ))}
    </>
  );
};

export { Loader, Card, MovieCardProps };

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: Colors.baseColors.border,
  },
});
