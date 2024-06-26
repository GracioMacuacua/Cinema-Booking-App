import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import TabBar from "@/components/TabBar";
import { Feather, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => (
        <TabBar {...props} colorScheme={colorScheme as "light" | "dark"} />
      )}
      
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => (
            <Fontisto name="heart-alt" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets/index"
        options={{
          title: "Meus Bilhetes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
