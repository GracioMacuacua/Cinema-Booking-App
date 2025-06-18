import { Stack } from "expo-router";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
// import NoConnection from "@/components/NoConnection";
// import Netinfo from "@react-native-community/netinfo";

const Layout = () => {
//   const [hasConnection, setHasConnection] = useState<boolean>();
// 
//   useEffect(() => {
//     const unsubscribe = Netinfo.addEventListener((state) => {
//       setHasConnection(!!state.isInternetReachable);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [hasConnection]);

//   if (!hasConnection) {
//     return <NoConnection />;
//   }

  return (
    <Stack screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notifications/index"
        options={{ title: "Notificações" }}
      />
      <Stack.Screen 
        name="categories/index" 
        options={{ title: "Categorias" }} 
      />
      <Stack.Screen
        name="moviedetails/index"
        options={{ title: "Detalhes do Filme" }}
      />
      <Stack.Screen
        name="latestmovies/index"
        options={{ title: "Últimos Lançamentos" }}
      />
      <Stack.Screen
        name="trendingmovies/index"
        options={{ title: "Mais Assistidos" }}
      />
      <Stack.Screen
        name="selectseats/index"
        options={{ title: "Seleção de Assentos" }}
      />
      <Stack.Screen
        name="checkout/index"
        options={{ title: "Checkout" }}
      />
      <Stack.Screen
        name="ticket/index"
        options={{ title: "Ver Bilhete" }}
      />
    </Stack>
  );
};

export default Layout;
