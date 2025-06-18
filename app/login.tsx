import { LinkButton, ExtendedButton } from "@/components/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import TextInput from "@/components/TextInput";
import { Link, router } from "expo-router";
import Screen from "@/components/Screen";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from "react-native";

const Login = () => {
  const [fetching, setFetching] = useState(false);
  const AppIcon = require("../assets/images/adaptive-icon.png");
  const GoogleIcon = require("../assets/images/googleicon.png");

  const handleSubmit = () => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      router.replace("/home");
    }, 100);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        enabled
        style={{ flexDirection: "column", rowGap: 15 }}
      >
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={AppIcon}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </View>
          <Text style={styles.title}>Bem vindo</Text>
          <Text style={styles.text}>
            Inicie sessão usando as suas credenciais {"\n"} ou contas sociais
          </Text>
        </View>
        <View style={styles.content}>
          <ExtendedButton
            text="Entrar com Facebook"
            icon={() => (
              <FontAwesome6 name="facebook" size={24} color="#0866FF" />
            )}
            onPress={() => {
              ToastAndroid.show("Clicou em logar com Facebook", 100);
            }}
          />
          <ExtendedButton
            text="Entrar com Google"
            icon={({ color, size }) => (
              <Image source={GoogleIcon} style={{ width: 24, height: 24 }} />
            )}
            onPress={() => {
              ToastAndroid.show("Clicou em logar com Google", 100);
            }}
          />
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.text}>Ou continue com a sua conta</Text>
            <View style={styles.dividerLine} />
          </View>
          <TextInput
            label="Número de celular"
            inputMode="tel"
            autoComplete="tel"
            maxLength={13}
          />
          <TextInput
            label="Palavra passe"
            secureTextEntry
            autoComplete="password"
          />
          <Link
            href="/passrecover"
            push
            style={[styles.link, { textAlign: "right", marginBottom: 10 }]}
          >
            Esqueceu a palavra passe?
          </Link>
          <ExtendedButton
            text="Entrar"
            style={{
              backgroundColor: Colors.baseColors.button,
              borderColor: "transparent",
            }}
            textStyle={{
              color: Colors.baseColors.text,
            }}
            loading={fetching}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.footer}>
          <Text style={{ fontSize: 15 }}>Não tem uma conta?</Text>
          <Link href="/register" style={styles.link}>
            Registe-se
          </Link>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Login;

export const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 30,
  },
  text: {
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    fontSize: 16,
    color: Colors.baseColors.border,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    columnGap: 10,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.baseColors.border,
  },
  link: {
    color: Colors.baseColors.button,
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  content: {
    rowGap: 20,
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
