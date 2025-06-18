import React from "react";
import Screen from "@/components/Screen";
import EditText from "@/components/EditText";

const Categories = () => {
  return (
    <Screen
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <EditText
        pageText="Página de Categorias"
        linkText="Ir para Stack"
        path="/"
      />
    </Screen>
  );
};

export default Categories;
