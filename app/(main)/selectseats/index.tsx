import React from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import Screen from "@/components/Screen";
import { View, Text } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

type SeatsType = {
  [key: number]: string[];
};

const SEATS: SeatsType = {
  1: ["A", "B", "C", "D", "E", "F"],
  2: ["A", "B", "C", "D", "E", "F", "G", "H"],
  3: ["A", "B", "C", "D", "E", "F", "G", "H"],
  4: ["A", "B", "C", "D", "E", "F", "G", "H"],
  5: ["A", "B", "C", "D", "E", "F", "G", "H"],
  6: ["A", "B", "C", "D", "E", "F", "G", "H"],
  7: ["A", "B", "C", "D", "E", "F"],
};

const SelectSeats: React.FC = () => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <Screen>
      <View style={{ paddingTop: 15, alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/screen.png")}
          style={{ width: "75%", height: 65 }}
          contentFit="contain"
        />
      </View>
      <View style={styles.seatsContainer}>
        {Object.keys(SEATS).map((rowKey) => {
          const row = Number(rowKey);
          return (
            <View style={styles.seatsRow} key={`row-${row}`}>
              {SEATS[row].map((seat) => (
                <TouchableOpacity key={`seat-${row}-${seat}`}>
                  <MaterialIcons
                    name="event-seat"
                    size={styles.seat.width}
                    color={"#EEECED"}
                    style={styles.seat}
                  />
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="event-seat" size={32} color={"#FF515A"} />
            <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>
              Selecionado
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="event-seat" size={32} color={"#BAB5B5"} />
            <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>
              Reservado
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="event-seat" size={32} color={"#EEECED"} />
            <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>
              Disponível
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SelectSeats;

const styles = StyleSheet.create({
  seatsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 5,
  },
  seatsRow: {
    flexDirection: "row",
    gap: 5,
  },
  seat: {
    width: (Dimensions.get("screen").width - 40 - 35) / 8,
  },
});
