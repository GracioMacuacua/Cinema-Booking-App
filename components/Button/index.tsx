import React from "react";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinkProps } from "expo-router/build/link/Link";
import { ActivityIndicator, StyleSheet, TextStyle } from "react-native";
import { Button, _ButtonProps, Text, _TextProps, View } from "../Themed";

type BaseButtonProps = {
  text?: string;
  icon?: ({ color, size }: { color: string; size: number }) => React.ReactNode;
  textStyle?: TextStyle;
  loading?: boolean;
};

type LinkButtonProps = LinkProps & BaseButtonProps;
type ExtendedButtonProps = _ButtonProps & BaseButtonProps;

export const LinkButton = (props: LinkButtonProps) => {
  const { icon, text, href, loading, style, textStyle, ...otherProps } = props;

  const Icon = icon
    ? icon({ color: useThemeColor({}, "tabIconSelected"), size: 1 })
    : null;

  return (
    <Link href={href} asChild {...otherProps} style={styles.wrapper}>
      <Button style={style} disabled={loading}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: Icon ? (text ? 8 : 0) : 0,
            backgroundColor: "transparent",
          }}
        >
          {Icon}
        </View>
        {loading ? (
          <ActivityIndicator color={Colors.baseColors.icon} size={24} />
        ) : (
          <Text
            style={[styles.text, { color: Colors.baseColors.text }, textStyle]}
          >
            {text}
          </Text>
        )}
      </Button>
    </Link>
  );
};

export const ExtendedButton = (props: ExtendedButtonProps) => {
  const { icon, text, loading, style, textStyle, ...otherProps } = props;

  const Icon = icon
    ? icon({ color: useThemeColor({}, "text"), size: 1 })
    : null;

  return (
    <Button
      style={[
        styles.wrapper,
        {
          backgroundColor: "transparent",
          borderColor: Colors.baseColors.border,
          borderWidth: StyleSheet.hairlineWidth,
        },
        style,
      ]}
      {...otherProps}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: Icon ? (text ? 8 : 0) : 0,
          backgroundColor: "transparent",
        }}
      >
        {Icon}
      </View>
      {loading ? (
        <ActivityIndicator color={Colors.baseColors.icon} size={24} />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    textAlign: "center",
    verticalAlign: "middle",
  },
});
