import React from "react";
import { View, Text } from "../Themed";
import { FlatList, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const EmptyList = ({ message }: { message?: string }) => {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        {message ?? "Sem dados para exibir"}
      </Text>
    </View>
  );
};

const Listing = <T extends { id: string }>({
  data,
  card,
  column,
  emptyMessage,
}: {
  data: T[];
  card: ({ item }: { item: T }) => React.ReactElement;
  column?: "single" | "double";
  emptyMessage?: string;
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => card({ item })}
      initialNumToRender={5}
      keyExtractor={(item) => item.id}
      horizontal={!column}
      ListEmptyComponent={<EmptyList message={emptyMessage} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        data.length === 0 ? { flex: 1 } : styles.listContainer
      }
      numColumns={column === "double" ? 2 : 1}
      columnWrapperStyle={
        column === "double" ? styles.columnContainer : undefined
      }
    />
  );
};

export default Listing;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    gap: 15,
  },
  columnContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: Colors.baseColors.border,
  },
});
