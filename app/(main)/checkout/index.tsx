import {
  TextInput,
  StyleSheet,
  Dimensions,
  TextInputProps,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import Screen from "@/components/Screen";
import { AntDesign } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { ExtendedButton } from "@/components/Button";
import CustomBottomSheet from "@/components/BottomSheet";
import { styles as _Styles } from "@/components/TextInput";
import React, { useCallback, useState, useRef } from "react";
import { styles as Styles } from "@/components/Cards/SearchResultCard";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";

type InputProps = BottomSheetTextInputProps & {
  label: string;
};

const Input = (props: InputProps) => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <BottomSheetView
      style={[
        _Styles.container,
        { borderColor: "#FF515A", paddingHorizontal: 8, paddingVertical: 8 },
        props.style,
      ]}
    >
      <Text style={styles.label}>{props.label}</Text>
      <BottomSheetTextInput
        style={[styles.textinput, { color: Colors[colorScheme].text }]}
        onChangeText={props.onChangeText}
      />
    </BottomSheetView>
  );
};

const Checkout = () => {
  const [value, setValue] = useState("mastercard");
  const { cost, seats, sessionId } = useLocalSearchParams();
  const colorScheme = useColorScheme() as "light" | "dark";
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = useCallback((option: string) => {
    setValue(option);
  }, []);

  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.present();

  console.log(cost);

  return (
    <>
      <Screen style={{ paddingBottom: 15 }}>
        <View style={styles.container}>
          {/** Card do filme */}

          <View style={Styles.container} darkColor="#1B1415">
            <Image
              source={
                "https://image.tmdb.org/t/p/original/A4kvp7vY1BDLrrQIagRCffLKj1t.jpg"
              }
              style={{ width: 100, height: 100, borderRadius: 10 }}
              contentFit="cover"
            />
            <View style={[Styles.column, { backgroundColor: "transparent" }]}>
              <Text style={styles.title}>Vingadores: Guerra infinita</Text>
              <Text style={Styles.lightText}>Filme de Hollywood</Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  gap: 5,
                }}
              >
                <AntDesign name="star" color={"#FF9901"} size={20} />
                <Text style={[Styles.lightText, { fontSize: 14 }]}>N/C</Text>
                <Text style={[Styles.lightText, { fontSize: 14 }]}>
                  (Sem Avaliação)
                </Text>
              </View>
            </View>
          </View>

          {/** Lista de métodos de pagamento */}

          <Text style={styles.title}>Método de Pagamento</Text>
          <RadioButton.Group
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
              onPress={() => handleSelect("mastercard")}
            >
              <View
                style={{
                  padding: 5,
                  backgroundColor:
                    colorScheme === "light" ? "#F8F8F8" : "#1B1415",
                  borderRadius: 15,
                }}
              >
                <Image
                  source={require("../../../assets/images/mastercard.jpg")}
                  style={{ width: 50, height: 50 }}
                  contentFit="contain"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>MasterCard</Text>
                <Text style={Styles.lightText}>{"56** **** **** *658"}</Text>
              </View>
              <RadioButton
                value="mastercard"
                color={Colors.baseColors.button}
              />
            </TouchableOpacity>
            <ExtendedButton
              text="Adicionar Novo Cartão"
              icon={() => (
                <AntDesign
                  name="plus"
                  color={Colors.baseColors.button}
                  size={24}
                />
              )}
              textStyle={{ color: Colors.baseColors.button }}
              style={{ borderColor: Colors.baseColors.button, borderWidth: 1 }}
              onPress={handleOpenBottomSheet}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 15,
              }}
              onPress={() => handleSelect("paypal")}
            >
              <View
                style={{
                  padding: 5,
                  backgroundColor:
                    colorScheme === "light" ? "#F8F8F8" : "#1B1415",
                  borderRadius: 15,
                }}
              >
                <Image
                  source={require("../../../assets/images/paypal.png")}
                  style={{ width: 50, height: 50 }}
                  contentFit="contain"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>PayPal</Text>
              </View>
              <RadioButton value="paypal" color={Colors.baseColors.button} />
            </TouchableOpacity>
          </RadioButton.Group>

          {/** Outros componentes */}

          <View style={styles.divider}></View>
          <View style={styles.row}>
            <Text style={styles.text}>Custo Total</Text>
            <Text style={styles.text}>{cost} MT</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Desconto</Text>
            <Text style={styles.text}>{"0"} MT</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.row}>
            <Text style={styles.title}>Custo Final</Text>
            <Text style={styles.title}>{cost} MT</Text>
          </View>
        </View>
        <ExtendedButton
          style={{
            borderColor: "transparent",
            backgroundColor: "#FF515A",
          }}
          textStyle={{
            color: Colors.baseColors.text,
          }}
          text="Efectuar Pagamento"
          loading={false}
        />
      </Screen>

      {/** Bottomsheet para adicionar cartão */}

      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Adicionar Novo Cartão</Text>
          <Text style={[Styles.lightText, { fontSize: 16 }]}>
            Adicione os dados do cartão aqui
          </Text>
          <View style={{ width: "100%", flex: 1, marginTop: 20, gap: 15 }}>
            <Input
              label="Número do cartão"
              inputMode="numeric"
              autoComplete="off"
              maxLength={13}
            />
            <Input
              label="Nome do titular"
              inputMode="numeric"
              autoComplete="off"
              maxLength={13}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Input label="Data de Validade" style={{ flex: 1 }} />
              <Input label="CVV" style={{ flex: 1 }} />
            </View>
            <ExtendedButton
              style={{
                borderColor: "transparent",
                backgroundColor: "#FF515A",
                marginTop: 20,
              }}
              textStyle={{
                color: Colors.baseColors.text,
              }}
              text="Adicionar Cartão"
            />
          </View>
        </View>
      </CustomBottomSheet>

      {/** Modal de sucesso na criação de bilhete */}


    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    gap: 15,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 17,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.baseColors.border,
    marginVertical: 5,
  },
  label: {
    letterSpacing: 0.3,
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#FF515A",
  },
  textinput: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
});
