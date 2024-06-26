import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React, { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { Text } from "../Themed";

type TabItemProps = {
  label: string;
  focused: boolean;
  colorScheme: "light" | "dark";
  options: BottomTabNavigationOptions;
  onPress: (event: React.GestureResponderEvent) => void;
};

const TabBarItem = ({
  label,
  focused,
  colorScheme,
  options,
  onPress,
}: TabItemProps) => {
  const Icon = options.tabBarIcon ? (
    options.tabBarIcon({
      focused: focused,
      color: focused
        ? Colors[colorScheme].tabIconSelected
        : Colors[colorScheme].tabIconDefault,
      size: 1,
    })
  ) : (
    <Text style={{ fontSize: 20, color: Colors[colorScheme].text }}>⏷</Text>
  );

  return (
    <TouchableOpacity
      style={[
        focused ? { backgroundColor: Colors[colorScheme].tint } : null,
        styles.tabBarItem,
      ]}
      onPress={onPress}
    >
      {Icon}
      {focused && (
        <Text
          style={[
            { color: Colors[colorScheme].tabIconSelected },
            styles.tabBarLabel,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TabBarItem;

const styles = StyleSheet.create({
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
