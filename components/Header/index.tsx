import React, { StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { View, Text } from "../Themed";
import Colors from "@/constants/Colors";

const Header = ({ options, navigation }: NativeStackHeaderProps) => {
  const colorScheme = useColorScheme() as "light" | "dark";

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <MaterialIcons
          name="arrow-back-ios-new"
          color={Colors[colorScheme].text}
          size={24}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{options.title}</Text>
      <Text style={{ flexBasis: 50 }}></Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    elevation: 1,                                                                                                                                                                                      
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
