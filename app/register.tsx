import RegisterModal from "@/components/Modal/RegisterModal";
import { ExtendedButton } from "@/components/Button";
import Screen from "@/components/Screen";
import { Text, View } from "@/components/Themed";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { styles } from "./login";
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type DataProps = {
  fullName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [data, setData] = useState<DataProps>({
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const AppIcon = require("../assets/images/adaptive-icon.png");

  const toggleModalVisible = () => setModalVisible((prevValue) => !prevValue);

  const handleSubmit = (
    e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      data.fullName.length >= 10 &&
      data.phoneNumber.length == 13 &&
      data.password.length >= 6 &&
      data.password === data.confirmPassword
    ) {
    }
    setModalVisible(true);
  };

  return (
    <>
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          enabled
          style={{ flexDirection: "column", rowGap: 15 }}
        >
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <Image source={AppIcon} style={{ width: 120, height: 120 }} />
            </View>
            <Text style={styles.title}>Criar Nova Conta</Text>
            <Text style={styles.text}>
              Configure os seus dados de utilizador.{"\n"}
              Pode alterá-los mais tarde.
            </Text>
          </View>
          <View style={styles.content}>
            <TextInput
              label="Nome"
              inputMode="text"
              autoComplete="name"
              autoCapitalize="words"
              maxLength={40}
              onChangeText={(text) => setData({ ...data, fullName: text })}
            />
            <TextInput
              label="Número de celular"
              inputMode="tel"
              keyboardType="phone-pad"
              autoComplete="tel"
              maxLength={13}
              onChangeText={(text) => setData({ ...data, phoneNumber: text })}
            />
            <TextInput
              label="Palavra passe"
              secureTextEntry
              maxLength={12}
              onChangeText={(text) => setData({ ...data, password: text })}
            />
            <TextInput
              label="Confirmar a palavra passe"
              secureTextEntry
              maxLength={12}
              onChangeText={(text) =>
                setData({ ...data, confirmPassword: text })
              }
            />
            <ExtendedButton
              text="Registar-me"
              style={{
                marginTop: 20,
                backgroundColor: Colors.baseColors.button,
                borderColor: "transparent",
              }}
              textStyle={{
                color: Colors.baseColors.text,
              }}
              onPress={handleSubmit}
            />
          </View>
          <View style={styles.footer}>
            <Text style={{ fontSize: 15 }}>Já possui uma conta?</Text>
            <Link href="/login" style={styles.link}>
              Entrar
            </Link>
          </View>
        </KeyboardAvoidingView>
      </Screen>
      <RegisterModal
        visible={modalVisible}
        toggleVisible={toggleModalVisible}
        phoneNumber={data.phoneNumber}
      />
    </>
  );
};

export default Register;
