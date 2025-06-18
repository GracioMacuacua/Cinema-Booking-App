import React from "react/";
import Screen from "@/components/Screen";
import EditText from "@/components/EditText";

const Tickets = () => {
  return (
    <Screen
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EditText
        pageText="Página de Bilhetes"
        linkText="Ir para Stack"
        path="/"
      />
    </Screen>
  );
};

export default Tickets;
