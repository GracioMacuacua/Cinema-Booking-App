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
        `http://192.168.171.108:3000/notifications?_page=${page}`
      );
      return response.data;
    }
  );
  const [page, setPage] = useState(0);

  return (
    <Screen>
      {isLoading ? (
        <View style={[styles.listContainer]}>
          <Notification.Loader count={2} />
          <Notification.Loader count={4} />
        </View>
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
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Screen>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    gap: 10,
    width: Dimensions.get("screen").width - 40,
  },
  header: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
