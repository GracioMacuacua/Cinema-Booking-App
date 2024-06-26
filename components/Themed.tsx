import React from "react";
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  TextInputProps,
  TextInput as DefultTextInput,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type _TextProps = ThemeProps &
  React.ComponentProps<typeof Animated.Text>;
export type _ViewProps = ThemeProps &
  React.ComponentProps<typeof Animated.View>;
export type _TextInputProps = ThemeProps & TextInputProps;
export type _ButtonProps = ThemeProps & TouchableOpacityProps;

export function Text(props: _TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <Animated.Text style={[{ color }, style]} {...otherProps} />;
}

export function View(props: _ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Button = React.forwardRef<TouchableOpacity, _ButtonProps>(
  (props, ref) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "tint"
    );

    return (
      <TouchableOpacity
        ref={ref}
        style={[{ backgroundColor }, style]}
        {...otherProps}
      />
    );
  }
);

export const TextInput = (props: _TextInputProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefultTextInput style={[{ color }, style]} {...otherProps} />;
};
