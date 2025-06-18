import { useQuery } from "react-query";
import React, { useState } from "react";
import Screen from "@/components/Screen";
import { Text, View } from "@/components/Themed";
import { EmptyList } from "@/components/Listing";
import { Dimensions, SectionList, StyleSheet } from "react-native";
import * as Notification from "@/components/Cards/NotificationCard";
import axios from "axios";

type NotificationDataProps = {
  day: string;
  data: {
    type: Notification.NotificationType;
    title: string;
    text: string;
  }[];
};

const Notifications = () => {
  const { data, isLoading, error } = useQuery<NotificationDataProps[]>(
    "notfications",
    async () => {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_API_URL + `/notifications?_page=${page}`
      );
      return response.data;
    }
  );
  const [page, setPage] = useState(0);

  return (
    <View style={[styles.listContainer]}>
      {isLoading ? (
        <>
          <Notification.Loader count={2} />
          <Notification.Loader count={4} />
        </>
      ) : (
        <SectionList
          sections={data ?? []}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Notification.Card data={item} />}
          renderSectionHeader={({ section: { day } }) => (
            <Text style={styles.header}>{day}</Text>
          )}
          ListEmptyComponent={<EmptyList />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 15
  },
  header: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
