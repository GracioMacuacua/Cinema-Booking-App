import {
  FontAwesome6,
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";
import { View, Text } from "@/components/Themed";
import { Skeleton } from "react-native-skeletons";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

enum NotificationType {
  SECURITY = 0,
  PROMOTION = 1,
  PAYMENT_METHOD = 2,
  SEAT_UPDATE = 3,
  USER_UPDATE = 4,
}

function getIcon(type: NotificationType) {
  switch (type) {
    case NotificationType.SECURITY:
      return <Feather name="lock" size={24} color="white" />;
    case NotificationType.PROMOTION:
      return <Ionicons name="gift-outline" size={25} color="white" />;
    case NotificationType.PAYMENT_METHOD:
      return <FontAwesome6 name="credit-card" size={22} color="white" />;
    case NotificationType.SEAT_UPDATE:
      return <MaterialIcons name="event-seat" size={26} color="white" />;
    case NotificationType.USER_UPDATE:
      return <FontAwesome5 name="user" size={24} color="white" />;
  }
}

type NotificationDataProps = {
  title: string;
  text: string;
  type: NotificationType;
};

const Card = React.memo(({ data }: { data: NotificationDataProps }) => {
  const insets = useSafeAreaInsets();
  const calc =
    (Dimensions.get("screen").height - insets.top - insets.bottom) / 6 - 12 * 6;
  const ICON_HOLDER_WIDTH = calc > 55 ? calc : 55;
  const PADDING = Dimensions.get("screen").height / 150 + 5;

  const Icon = () => getIcon(data.type);

  return (
    <View style={styles.wrapper} darkColor="#1B1415">
      <View
        style={[
          styles.icon,
          { width: ICON_HOLDER_WIDTH, height: ICON_HOLDER_WIDTH },
        ]}
        darkColor="#1B1415"
      >
        <Icon />
      </View>
      <View
        style={{ flex: 1, justifyContent: "space-between", marginLeft: 10 }}
        darkColor="#1B1415"
      >
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.text}>{data.text}</Text>
      </View>
    </View>
  );
});

const PADDING = Dimensions.get("screen").height / 150 + 5;

const Loader = ({ count }: { count: number }) => {
  const insets = useSafeAreaInsets();
  const calc =
    (Dimensions.get("screen").height - insets.top - insets.bottom) / 6 - 12 * 6;
  const ICON_HOLDER_WIDTH = calc > 55 ? calc : 55;

  return (
    <View style={{ marginTop: 15, gap: 10 }}>
      <Skeleton width={100} style={{ marginBottom: 20 }} />
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <View style={styles.wrapper} darkColor="#1B1415" key={i}>
            <Skeleton circle width={ICON_HOLDER_WIDTH} />
            <View style={styles.loaderContentHolder} darkColor="#1B1415">
              <Skeleton />
              <View style={{ gap: 5 }}>
                <Skeleton height={8} />
                <Skeleton height={10} />
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export { Loader, Card, NotificationDataProps, NotificationType };

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: PADDING + 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.baseColors.button,
    borderRadius: 500,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: Colors.baseColors.border,
  },
  loaderContentHolder: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
    gap: 15,
  },
});
