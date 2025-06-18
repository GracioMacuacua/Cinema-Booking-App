import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { SessionProps } from "@/app/(main)/selectseats";

const SeatsLegenda = ({ color, status }: { color: string; status: string }) => {
    console.log("Legenda Actualizada")
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <MaterialIcons name="event-seat" size={32} color={color} />
      <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>
        {status}
      </Text>
    </View>
  );
};

export type SeatProps = {
  [key: string]: "available" | "reserved";
};

const SeatsMap = ({
  sessions,
  selectedDay,
  selectedSeats,
  handleSelectSeat,
}: {
  sessions: SessionProps[];
  selectedDay: number;
  selectedSeats: string[];
  handleSelectSeat: (row: number, column: string) => void;
}) => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <>
      {sessions &&
        sessions[selectedDay].seats.map((ROW, rowIndex) => {
          return (
            <View style={styles.seatsRow} key={`row-${rowIndex}`}>
              {Object.keys(ROW).map((seat, index) => {
                return (
                  <TouchableOpacity
                    key={`seat-${rowIndex}-${seat}`}
                    disabled={ROW[seat] === "reserved"}
                    onPress={() => handleSelectSeat(rowIndex, seat)}
                  >
                    <MaterialIcons
                      name="event-seat"
                      size={styles.seat.width}
                      color={
                        ROW[seat] === "reserved"
                          ? colorScheme === "light"
                            ? "#BAB5B5"
                            : "#8B8485"
                          : selectedSeats.includes(`${rowIndex + seat}`)
                          ? "#FF515A"
                          : colorScheme === "light"
                          ? "#EEECED"
                          : "#312B2C"
                      }
                      style={styles.seat}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      <View style={styles.seatsLegenda}>
        <SeatsLegenda color="#FF515A" status="Selecionado" />
        <SeatsLegenda
          color={colorScheme === "light" ? "#BAB5B5" : "#8B8485"}
          status="Reservado"
        />
        <SeatsLegenda
          color={colorScheme === "light" ? "#EEECED" : "#312B2C"}
          status="Disponível"
        />
      </View>
    </>
  );
};

export default SeatsMap;

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
  seatsLegenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
});
