import React from "react";
import { View } from "../Themed";
import { BlurView } from "expo-blur";
import {
  Modal,
  ModalProps,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

const ModalView = (props: ModalProps) => {
  const { children, visible, ...otherProps } = props;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      {...otherProps}
    >
      <BlurView
        intensity={10}
        experimentalBlurMethod="dimezisBlurView"
        style={styles.centeredView}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.modal}>{children}</View>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    padding: 20,
    borderRadius: 17,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});
