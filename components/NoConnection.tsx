import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";

const NoConnection = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Oops, não está conectado à internet!</Text>
    </View>
  );
};

export default NoConnection;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
