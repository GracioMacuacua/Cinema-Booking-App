import React, { StatusBar, useColorScheme } from "react-native";
import { View, _ViewProps } from "@/components/Themed";
import Colors from "@/constants/Colors";

const Screen = (props: _ViewProps) => {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar
        translucent={false}
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={Colors[colorScheme as "light" | "dark"].background}
      />
      <View
        style={[
          {
            flex: 1,
            paddingTop: 10,
            paddingHorizontal: 20,
          },
          props.style,
        ]}
      >
        {props.children}
      </View>
    </>
  );
};

export default Screen;
