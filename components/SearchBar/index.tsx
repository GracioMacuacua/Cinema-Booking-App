import React from "react";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { View, TextInput } from "@/components/Themed";
import {
  StyleSheet,
  ViewStyle,
  useColorScheme,
} from "react-native";

const SearchBar = ({
  wrapperStyle,
  onChangeText,
}: {
  wrapperStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <View
      lightColor="#FBFAFA"
      darkColor="#1B1415"
      style={[styles.searchBar, wrapperStyle]}
    >
      <Feather
        name="search"
        size={24}
        color={Colors[colorScheme as "light" | "dark"].text}
      />
      <TextInput
        placeholder="Pesquisar"
        placeholderTextColor={Colors.baseColors.border}
        style={[
          styles.textInput,
          {
            flex: 1,
            color: Colors[colorScheme as "light" | "dark"].text,
            marginLeft: 5,
          },
        ]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    padding: 4,
  },
});
