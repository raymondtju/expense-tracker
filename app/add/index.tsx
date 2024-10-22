import { Stack, useNavigation } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import DialpadKeypad from "../../components/DialpadKeypad";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { Button } from "react-native-paper";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { NumericFormat } from "react-number-format";

const { width, height } = Dimensions.get("window");

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, -2, 0, -1];
const dialPadSize = width * 0.25;
const dialPadTextSize = dialPadSize * 0.4;

const pinLength = 4;
const pinContainerSize = width / 2;
const pinSize = pinContainerSize / pinLength;

export default function AddScreen() {
  const navigation = useNavigation();
  const [code, setCode] = useState<number[]>([]);

  const sheetRef = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleExpandPress = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  const renderItem = useCallback(
    (item) => (
      <ThemedView key={item} style={styles.listItem}>
        <ThemedText>{item}</ThemedText>
      </ThemedView>
    ),
    []
  );

  // Backdrop press to close the sheet
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close" // Close the bottom sheet when pressing the backdrop
      />
    ),
    []
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <BottomSheetModalProvider>
        <Stack.Screen
          options={{
            headerTitle: "Expense",
          }}
        />

        <GestureHandlerRootView style={styles.container}>
          <ThemedView style={styles.bottomContainer}>
            <ThemedView
              style={{
                flex: 1,
                height: width * 0.5,
                alignItems: "center",
              }}
            >
              <NumericFormat
                value={
                  code.length > 0
                    ? code.reduce((acc, curr) => acc + curr.toString(), "")
                    : 0
                }
                type="text"
                thousandSeparator={true}
                customInput={(props) => <ThemedText>{props.value}</ThemedText>}
              />
            </ThemedView>

            <ThemedView style={styles.rowContainer}>
              <Button
                onPress={() => {
                  handleSnapPress(0);
                }}
              >
                Category
              </Button>

              <Button onPress={() => {}}>Save</Button>
            </ThemedView>

            <DialpadKeypad
              dialPadContent={dialPadContent}
              pinLength={pinLength}
              setCode={setCode}
              code={code}
              dialPadSize={dialPadSize}
              dialPadTextSize={dialPadTextSize}
              navigation={navigation}
            />
          </ThemedView>

          {/* Move BottomSheet outside of the bottom container */}
          <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            onChange={handleSheetChange}
            enablePanDownToClose={true}
            enableHandlePanningGesture={true}
            backdropComponent={renderBackdrop}
            containerStyle={{
              marginBottom: 4,
              marginHorizontal: 4,
              borderRadius: 20,
            }}
          >
            <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
              {data.map(renderItem)}
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    width: width,
  },
  rowContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#0e0e0e",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
  },
  sheetContent: {
    backgroundColor: "white",
  },
  listItem: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
