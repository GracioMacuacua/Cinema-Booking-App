import { OtpInput } from "react-native-otp-entry";
import { View, Text } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ExtendedButton } from "../Button";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import ModalView from ".";
import {
  GestureResponderEvent,
  ModalProps,
  StyleSheet,
  useColorScheme,
} from "react-native";

interface SubmitDataModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenNext: () => void;
  phoneNumber: string;
}

const SubmitDataModal: React.FC<SubmitDataModalProps> = React.memo(
  ({ visible, onClose, onOpenNext, phoneNumber }) => {
    const [fetching, setFetching] = useState<boolean>(false);
    const { verifyPhoneNumber } = useAuth();

    const requestOTP = async () => {
      setFetching(true);
      verifyPhoneNumber(
        phoneNumber,
        () => {
          setFetching(false);
          onClose();
          setTimeout(onOpenNext, 2000);
        },
        (error) => {
          setFetching(false);
          console.log(error);
        }
      );
    };

    return (
      <ModalView visible={visible} onRequestClose={onClose}>
        <View style={styles.content}>
          <Text style={styles.text}>Validar o seu número de celular</Text>
          <Text style={styles.title}>{phoneNumber}</Text>
          <Text style={styles.text}>
            Enviaremos um código de validação para o número de celular
            introduzido.
            {"\n"}
            Deseja continuar?
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <ExtendedButton
            text="Cancelar"
            style={{ borderColor: Colors.baseColors.button, flex: 1 }}
            textStyle={{ color: Colors.baseColors.button }}
            onPress={onClose}
          />
          <ExtendedButton
            text="Continuar"
            style={{
              flex: 1,
              backgroundColor: Colors.baseColors.button,
              borderColor: "transparent",
            }}
            textStyle={{
              color: Colors.baseColors.text,
            }}
            onPress={requestOTP}
            loading={fetching}
          />
        </View>
      </ModalView>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.visible === nextProps.visible;
  }
);

interface CheckOPTModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenNext: () => void;
  phoneNumber: string;
}

const CheckOPTModal: React.FC<CheckOPTModalProps> = React.memo(
  ({ visible, onClose, onOpenNext, phoneNumber }) => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [code, setCode] = useState("");
    const { confirmCode } = useAuth();
    const colorScheme = useColorScheme();

    const checkOTP = () => {
      setFetching(true);
      confirmCode(
        code,
        () => {
          setFetching(false);
          onClose();
          setTimeout(onOpenNext, 2000);
        },
        (error) => {
          setFetching(false);
          console.log(error);
        }
      );
    };

    return (
      <ModalView visible={visible} onRequestClose={onClose}>
        <View style={styles.content}>
          <Text style={styles.title}>Introduza o OTP</Text>
          <Text style={styles.text}>
            Um código de validação foi enviado para o número {phoneNumber}
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setCode(text)}
            focusStickBlinkingDuration={400}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.otpInput,
              pinCodeTextStyle: {
                color: Colors[colorScheme as "light" | "dark"].text,
                fontFamily: "PoppinsBold",
              },
              focusedPinCodeContainerStyle: styles.otpFocusedInput,
              focusStickStyle: styles.otpFocusStick,
            }}
          />
        </View>
        <View style={[styles.buttonsContainer, { marginTop: 20 }]}>
          <ExtendedButton
            text="Verificar"
            style={{
              flex: 1,
              backgroundColor: Colors.baseColors.button,
              borderColor: "transparent",
            }}
            textStyle={{
              color: Colors.baseColors.text,
            }}
            onPress={checkOTP}
            loading={fetching}
          />
        </View>
        <View style={styles.footer}>
          <Text>Não recebeu o código?</Text>
          <Link href="#" style={styles.link}>
            Reenviar
          </Link>
        </View>
      </ModalView>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.visible === nextProps.visible;
  }
);

interface SuccessModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = React.memo(
  ({ visible, onClose }) => {
    const handlePress = (
      e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      e.preventDefault();
      setTimeout(onClose, 500);
      setTimeout(() => {
        router.replace("/home");
      }, 1000);
    };

    return (
      <ModalView visible={visible} onRequestClose={onClose}>
        <View style={styles.content}>
          <View
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
            lightColor={"#FFEEEE"}
            darkColor={"#2B1416"}
          >
            <View
              style={{
                width: 90,
                height: 90,
                backgroundColor: Colors.baseColors.button,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="checkcircle"
                size={24}
                color={Colors.baseColors.icon}
              />
            </View>
          </View>
          <Text style={styles.title}>Conta Criada Com Sucesso</Text>
          <Text style={styles.text}>
            A sua conta foi criada com sucesso.{"\n"}
            Agora pode usar a app.
          </Text>
        </View>
        <View style={[styles.buttonsContainer, { marginTop: 20 }]}>
          <ExtendedButton
            text="Ir ao menu"
            style={{
              flex: 1,
              backgroundColor: Colors.baseColors.button,
              borderColor: "transparent",
            }}
            textStyle={{
              color: Colors.baseColors.text,
            }}
            onPress={handlePress}
          />
        </View>
      </ModalView>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.visible === nextProps.visible;
  }
);

interface RegisterModalProps extends ModalProps {
  visible: boolean;
  toggleVisible: () => void;
  phoneNumber: string;
}

const RegisterModal = (props: RegisterModalProps) => {
  const [submitOTPModalVisible, setSubmitOTPModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const toggleSubmitOPTModalVisible = () =>
    setSubmitOTPModalVisible((prevValue) => !prevValue);
  const toggleSuccessModalVisible = () =>
    setSuccessModalVisible((prevValue) => !prevValue);

  return (
    <>
      <SubmitDataModal
        visible={props.visible}
        onClose={props.toggleVisible}
        onOpenNext={toggleSubmitOPTModalVisible}
        phoneNumber={props.phoneNumber}
      />
      <CheckOPTModal
        visible={submitOTPModalVisible}
        onClose={toggleSubmitOPTModalVisible}
        onOpenNext={toggleSuccessModalVisible}
        phoneNumber={props.phoneNumber}
      />
      <SuccessModal
        visible={successModalVisible}
        onClose={toggleSuccessModalVisible}
      />
    </>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 30,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  otpInput: {
    aspectRatio: 1,
    borderRadius: 10,
  },
  otpFocusedInput: {
    borderColor: Colors.baseColors.border,
  },
  otpFocusStick: {
    backgroundColor: Colors.baseColors.button,
  },
  link: {
    color: Colors.baseColors.button,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
