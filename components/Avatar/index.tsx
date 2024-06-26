import React from "react";
import { View } from "../Themed";
import { Image } from "expo-image";
import { ViewProps, StyleSheet } from "react-native";
import { useGlobalData } from "@/context/GlobalData";

interface AvatarProps extends ViewProps {
  avatar: string;
  avatarStyle?: "rounded" | "square";
}

const Avatar = React.memo(({ avatar, avatarStyle }: AvatarProps) => {
  return (
    <View
      style={styles[avatarStyle || "rounded"]}
      lightColor="#FF515A"
      darkColor="#FF515A"
    >
      <Image source={avatar} style={styles[avatarStyle || "rounded"]} />
    </View>
  );
});

export default Avatar;

const styles = StyleSheet.create({
  rounded: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  square: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
