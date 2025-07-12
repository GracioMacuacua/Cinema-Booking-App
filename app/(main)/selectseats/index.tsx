import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Image } from "expo-image";
import { useQuery } from "react-query";
import Colors from "@/constants/Colors";
import Screen from "@/components/Screen";
import { View, Text } from "@/components/Themed";
import { ExtendedButton } from "@/components/Button";
import SeatsMap, { SeatProps } from "@/components/SeatMap";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";

export type SessionProps = {
  id: string;
  movieId: string;
  room: string;
  dateTime: string;
  ticketPrice: number;
  seats: SeatProps[];
};

type BookingDetails = {
  seats: string[];
  sessionId: string;
  price: number;
};

const DAYS_OF_WEEK = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const SelectSeats: React.FC = () => {
  const { movieId } = useLocalSearchParams();
  const {
    data: sessions,
    isLoading,
    error,
  } = useQuery<SessionProps[]>(
    ["sessions", movieId],
    () =>
      fetcher(
        process.env.EXPO_PUBLIC_API_URL +
          `/sessions?movieId=${movieId}&_sort=dateTime`
      ),
    {
      cacheTime: 0,
    }
  );
  const colorScheme = useColorScheme() as "light" | "dark";
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    price: 0,
    seats: [],
    sessionId: "",
  });
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    return () => {
      setSelectedSeats([]);
      setSelectedDay(0);
      setSelectedHour(0);
    };
  }, []);

  useEffect(() => {
    setBookingDetails((prevDetails) => ({
      sessionId: sessions ? sessions[selectedDay].id : "",
      seats: selectedSeats,
      price: sessions ? sessions[0].ticketPrice * selectedSeats.length : 0,
    }));
  }, [selectedSeats]);

  useEffect(() => {
    return () => setSelectedSeats([]);
  }, [selectedDay]);

  const handleSelectSeat = useCallback(
    (row: number, column: string) => {
      const seat = `${row}${column}`;
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seat)
          ? prevSelectedSeats.filter((s) => s !== seat)
          : [...prevSelectedSeats, seat]
      );
    },
    [selectedSeats]
  );

  const handleBook = () => {
    router.push({
      pathname: "/checkout",
      params: {
        sessionId: bookingDetails.sessionId,
        seats: bookingDetails.seats,
        cost: bookingDetails.price,
      },
    });
  };

  //   console.log(bookingDetails);

  return (
    <Screen
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
    >
      <View
        style={{ paddingTop: 15, paddingHorizontal: 15, alignItems: "center" }}
      >
        <Image
          source={require("../../../assets/images/screen.png")}
          style={{ width: "75%", height: 65 }}
          contentFit="contain"
        />
      </View>
      <View style={{ marginTop: 15, justifyContent: "space-between", flex: 1 }}>
        <View style={styles.seatsContainer}>
          {isLoading ? (
            <View style={{ height: "51.3%" }}>
              <ActivityIndicator color={"#FF515A"} size={45} />
            </View>
          ) : (
            <SeatsMap
              sessions={sessions ?? []}
              selectedSeats={selectedSeats}
              handleSelectSeat={handleSelectSeat}
              selectedDay={selectedDay}
            />
          )}
        </View>
        <View
          style={styles.actionsContainer}
          lightColor="#F6F6F6"
          darkColor="#221C1D"
        >
          <Text style={styles.title}>Selecione a data e a hora</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sessionDetailsContainer}
          >
            {sessions &&
              sessions.map((session, id) => (
                <TouchableOpacity key={id} onPress={() => setSelectedDay(id)}>
                  <View
                    style={styles.dayWrapper}
                    lightColor={selectedDay === id ? "#FF515A" : "#EEEEEE"}
                    darkColor={selectedDay === id ? "#FF515A" : "#30292A"}
                  >
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: 14,
                      }}
                      lightColor={selectedDay === id ? "#FFFFFF" : "#130D0E"}
                    >
                      {DAYS_OF_WEEK[new Date(session.dateTime).getDay()]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 16,
                      }}
                      lightColor={selectedDay === id ? "#FFFFFF" : "#130D0E"}
                    >
                      {new Date(session.dateTime).getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sessionDetailsContainer}
          >
            {sessions &&
              sessions.map((session, id) => (
                <TouchableOpacity key={id} onPress={() => setSelectedHour(id)}>
                  <View
                    style={styles.hourWrapper}
                    lightColor={selectedHour === id ? "#FF515A" : "#EEEEEE"}
                    darkColor={selectedHour === id ? "#FF515A" : "#30292A"}
                  >
                    <Text
                      style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}
                      lightColor={selectedHour === id ? "#FFFFFF" : "#130D0E"}
                    >
                      {session.dateTime.split("T")[1].slice(0, 5)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 20,
              gap: 15,
            }}
            lightColor="#F6F6F6"
            darkColor="#221C1D"
          >
            <View
              style={{ justifyContent: "space-between" }}
              lightColor="#F6F6F6"
              darkColor="#221C1D"
            >
              <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>
                Custo Total
              </Text>
              <Text style={[styles.title, { fontSize: 16 }]}>
                {bookingDetails.price} MT
              </Text>
            </View>
            <ExtendedButton
              style={{
                flex: 1,
                borderColor: "transparent",
                backgroundColor: "#FF515A",
              }}
              textStyle={{
                color: Colors.baseColors.text,
              }}
              text="Efectuar Agendamento"
              disabled={!selectedSeats.length}
              onPress={handleBook}
            />
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
    paddingHorizontal: 15,
    gap: 5,
  },
  actionsContainer: {
    // flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    paddingTop: 15,
    paddingBottom: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: "PoppinsBold",
    textAlign: "center",
    fontSize: 18,
  },
  sessionDetailsContainer: {
    gap: 15,
  },
  dayWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  hourWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
});
