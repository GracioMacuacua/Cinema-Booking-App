import React from "react";
import { Text } from "@/components/Themed";
import { Link } from "expo-router";

type EditTextProps = {
  pageText: string;
  linkText: string;
  path: string;
};

const EditText = (props: EditTextProps) => {
  return (
    <>
      <Text style={{ fontSize: 20 }}>{props.pageText}</Text>
      <Link href={`${props.path}`} style={{ color: "blue", fontSize: 18 }}>
        {props.linkText}
      </Link>
    </>
  );
};

export default EditText;
