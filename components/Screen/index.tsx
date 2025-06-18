import React, {
  StatusBar,
  ScrollView,
  useColorScheme,
  ScrollViewProps,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";

const Screen = (props: ScrollViewProps) => {
  const { children, style, ...otherProps } = props;
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <ScrollView
      style={[
        {
          flex: 1,
        //   marginTop: 10,
          paddingHorizontal: 15,
          height: Dimensions.get("window").height,
          backgroundColor:
            colorScheme == "light"
              ? Colors.light.background
              : Colors.dark.background,
        },
        style,
      ]}
      {...otherProps}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default Screen;
