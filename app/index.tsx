import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { useGlobalData } from "@/context/GlobalData";
import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { LinkButton } from "@/components/Button";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Colors from "@/constants/Colors";
import { Redirect } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { hasLaunched, setHasLaunched } = useGlobalData();

  let SLIDES: { title: string[]; text: string; image: any }[] = [
    {
      title: ["Encontre os", "últimos e melhores", "filmes aqui"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.",
      image: require("../assets/images/slide1.png"),
    },
    {
      title: ["Assista o seu", "filme favorito", "conosco"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.",
      image: require("../assets/images/slide2.png"),
    },
    {
      title: ["Reserve o bilhete do", "seu filme favorito", "aqui"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.",
      image: require("../assets/images/slide3.png"),
    },
  ];

  const handlePress = async () => {
    await AsyncStorage.setItem("@RNCBA:hasLaunched", "true");
    setHasLaunched(true);
  };

  return (
    <>
      {hasLaunched ? (
        <Redirect href={"/login"} />
      ) : (
        <>
          <Swiper
            loop={false}
            dotColor={Colors.baseColors.dot}
            activeDotStyle={{ paddingHorizontal: 15 }}
            activeDotColor={Colors.baseColors.button}
            onIndexChanged={(index) => setSlideIndex(index)}
          >
            {SLIDES.map((slide, i) => (
              <View key={i} style={{ flex: 1 }}>
                <View style={styles.content}>
                  <Text style={styles.title}>
                    {SLIDES[i].title[0]}{" "}
                    {
                      <Text style={{ color: Colors.light.tint }}>
                        {SLIDES[i].title[1]}
                      </Text>
                    }{" "}
                    {SLIDES[i].title[2]}
                  </Text>
                  <Text style={styles.text}>{SLIDES[i].text}</Text>
                  <LinkButton
                    href="/login"
                    text={slideIndex >= 2 ? "Iniciar" : "Pular"}
                    style={styles.skipButton}
                    onPress={handlePress}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    style={styles.slideImage}
                    source={SLIDES[i].image}
                    cachePolicy={"disk"}
                  />
                </View>
              </View>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginBottom: 10,
    gap: 10,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: RFValue(24),
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(14),
  },
  skipButton: {
    maxWidth: 80,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: "100%",
    height: "100%",
  },
});
