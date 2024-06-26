import React, {
  StyleSheet,
  View as DefaultView,
  Animated,
} from "react-native";
import TabBarItem from "./TabBarItem";
import Colors from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { View } from "@/components/Themed";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useIsKeyboardShown from "@react-navigation/bottom-tabs/src/utils/useIsKeyboardShown";

type TabBarProps = Omit<BottomTabBarProps, "insets"> & {
  colorScheme: "light" | "dark";
};

const TabBar = ({
  state,
  navigation,
  descriptors,
  colorScheme,
}: TabBarProps) => {
  const isKeyboardShown = useIsKeyboardShown();
  const tabBarAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(tabBarAnimation, {
      toValue: isKeyboardShown ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    return () => {
      tabBarAnimation.stopAnimation();
    };
  }, [isKeyboardShown, tabBarAnimation]);

  return (
    <DefaultView style={{ backgroundColor: Colors[colorScheme].background }}>
      <View
        style={[
          {
            shadowColor: Colors[colorScheme].tabIconDefault,
            transform: [
              {
                translateY: tabBarAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 65],
                }),
              },
            ],
          },
          styles.tabBar,
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const focusedRoute = state.routes[state.index];
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabBarItem
              key={route.key}
              label={options.title || focusedRoute.name}
              focused={isFocused}
              options={options}
              colorScheme={colorScheme}
              onPress={onPress}
            />
          );
        })}
      </View>
    </DefaultView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  tabBarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  tabBarLabel: {
    marginLeft: 8,
    verticalAlign: "middle",
  },
});
