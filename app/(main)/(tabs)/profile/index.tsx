import React from "react";
import Screen from "@/components/Screen";
import EditText from "@/components/EditText";

const Profile = () => {
  return (
    <Screen style={{ alignItems: "center", justifyContent: "center" }}>
      <EditText pageText="Página de Perfil" linkText="Ir para Stack" path="/" />
    </Screen>
  );
};

export default Profile;
