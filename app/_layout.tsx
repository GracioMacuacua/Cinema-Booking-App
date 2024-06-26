import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalDataProvider, useGlobalData } from "@/context/GlobalData";

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // AsyncStorage.clear()

  return (
    <GlobalDataProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </GlobalDataProvider>
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
