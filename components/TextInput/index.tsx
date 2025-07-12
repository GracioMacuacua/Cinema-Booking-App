import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Easing,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { View, Text, TextInput } from "../Themed";
import { ExtendedButton } from "../Button";
import Colors from "@/constants/Colors";

type _TextInputProps = TextInputProps & {
  label: string;
  labelStyle?: Extract<React.ComponentProps<typeof Animated.Text>, "style">;
};

const _TextInput = (props: _TextInputProps) => {
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const { label, labelStyle, onFocus, onBlur, onChangeText, ...otherProps } =
    props;

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!value) {
      setIsFocused(false);
    }
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const togglePasswordVisible = () =>
    setPasswordVisible((prevState) => !prevState);

  useEffect(() => {
    if (!value) {
      Animated.timing(focusAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 150,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [focusAnim, isFocused]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            bottom: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 32],
            }),
            fontSize: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 10],
            }),
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
      <TextInput
        {...otherProps}
        style={[
          styles.textinput,
          { marginRight: props.secureTextEntry || passwordVisible ? 38 : 8 },
        ]}
        secureTextEntry={props.secureTextEntry && !passwordVisible}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      />
      {(props.secureTextEntry || passwordVisible) && (
        <ExtendedButton
          icon={({ color }) =>
            passwordVisible ? (
              <Feather name="eye-off" size={24} color={color} />
            ) : (
              <Feather name="eye" size={24} color={color} />
            )
          }
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            borderWidth: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={togglePasswordVisible}
        />
      )}
    </View>
  );
};

export default _TextInput;

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderColor: Colors.baseColors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  label: {
    position: "absolute",
    letterSpacing: 0.3,
    marginLeft: 10,
    fontFamily: "PoppinsRegular",
  },
  textinput: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: "transparent",
  },
});
