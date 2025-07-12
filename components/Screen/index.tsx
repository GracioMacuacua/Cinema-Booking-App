import React, {
  StatusBar,
  ScrollView,
  useColorScheme,
  ScrollViewProps,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";

const Screen = (props: ScrollViewProps) => {
  const { children, style, contentContainerStyle, ...otherProps } = props;
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <ScrollView
      style={[
        {
          backgroundColor:
            colorScheme == "light"
              ? Colors.light.background
              : Colors.dark.background,
        },
        style,
      ]}
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingHorizontal: 15,
          // backgroundColor: "#0F0",
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
};

export default Screen;
