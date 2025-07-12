import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalDataProvider, useGlobalData } from "@/context/GlobalData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() as "light" | "dark";
  AsyncStorage.clear()

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.dark.background,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <GlobalDataProvider>
              <QueryClientProvider client={queryClient}>
                <RootLayoutNav />
              </QueryClientProvider>
            </GlobalDataProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const RootLayoutNav = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, error] = useFonts({
    PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    LatoRegular: require("@/assets/fonts/Lato-Regular.ttf"),
  });

  const { user, signOut } = useAuth();
  const { hasLaunched, setHasLaunched } = useGlobalData();

  // signOut()

  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem("@RNCBA:hasLaunched");
    if (hasLaunched === "true") {
      false;
      setHasLaunched(true);
    } else {
      setHasLaunched(false);
    }
    setLoading(false);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  if (!loaded) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
      </Stack>
    );
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="passrecover" />
      </Stack>
    );
  }
};
