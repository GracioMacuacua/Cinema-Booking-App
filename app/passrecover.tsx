import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { View } from "@/components/Themed";
import Screen from "@/components/Screen";
import { Image } from "expo-image";
import EditText from "@/components/EditText";

const PasswordRecover = () => {
  return (
    <Screen>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={{ width: 100, height: 100 }}
        />
        <EditText
          pageText="Página de Recuperação de Senha"
          linkText="Voltar ao início"
          path="/"
        />
      </View>
    </Screen>
  );
};

export default PasswordRecover;

const styles = StyleSheet.create({
  header: {},
  content: {},
  footer: {},
});
