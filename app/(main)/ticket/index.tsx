import {} from "react-native";
import Screen from "@/components/Screen";
import EditText from "@/components/EditText";

const Ticket = () => {
  return (
    <Screen>
      <EditText
        pageText="Página de Bilhete"
        linkText="Ir para Stack"
        path="/"
      />
    </Screen>
  );
};

export default Ticket;
