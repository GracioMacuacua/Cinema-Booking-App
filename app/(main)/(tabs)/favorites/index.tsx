import React from "react";
import Screen from "@/components/Screen";
import EditText from "@/components/EditText";

const Favorites = () => {
  return (
    <Screen style={{ alignItems: "center", justifyContent: "center" }}>
      <EditText
        pageText="Página de Favoritos"
        linkText="Ir para Stack"
        path="/"
      />
    </Screen>
  );
};

export default Favorites;
