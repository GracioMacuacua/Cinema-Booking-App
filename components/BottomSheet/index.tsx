import { BlurView } from "expo-blur";
import { View } from "@/components/Themed";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, useColorScheme } from "react-native";
import React, { useMemo, forwardRef, useCallback } from "react";

interface Props {
  children: React.ReactElement;
}

type Ref = BottomSheetModal;

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "65%"], []);
  const colorScheme = useColorScheme() as "light" | "dark";

  const renderBackdrop = useCallback(
    () => (
      <BlurView
        intensity={5}
        experimentalBlurMethod="dimezisBlurView"
        style={styles.centeredView}
        onTouchEnd={() => {
          if (ref && "current" in ref && ref.current) {
            ref.current.dismiss();
          }
        }}
      />
    ),
    []
  );

  const { children } = props;

  return (
    <BottomSheetModal
      ref={ref}
      name="CustomBottomSheet"
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={[
        { backgroundColor: colorScheme === "light" ? "#E7E7E7" : "#312B2C" },
        styles.handleIndicator,
      ]}
      backgroundComponent={({ style }) => (
        <View style={[style, styles.backgroundComponent]} />
      )}
      style={{ paddingHorizontal: 20 }}
    >
      {children}
    </BottomSheetModal>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({
  backgroundComponent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
  },
  centeredView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  handleIndicator: {
    width: 45,
    borderRadius: 2,
    marginBottom: 10,
  },
});
