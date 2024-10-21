import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { Button } from "react-native-paper";
import { ThemedView } from "./ThemedView";

const DialpadKeypad = ({
  dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, -2, 0, -1],
  pinLength,
  code,
  setCode,
  navigation,
  dialPadSize,
  dialPadTextSize,
}: {
  dialPadContent: number[];
  pinLength: number;
  code: number[];
  setCode: React.Dispatch<React.SetStateAction<number[]>>;
  navigation: any;
  dialPadSize: number;
  dialPadTextSize: number;
}) => {
  return (
    <ThemedView
      style={{
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <FlatList
        data={dialPadContent}
        numColumns={3}
        style={{
          overflow: "visible",
        }}
        contentContainerStyle={{
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <Button
              disabled={item === -2} // make the empty space on the dialpad content unclickable
              onPress={() => {
                if (item === -1) {
                  setCode((prev) => prev.slice(0, -1));
                } else {
                  setCode((prev) => [...prev, item]);
                }
              }}
              // style={[
              //   {
              //     justifyContent: "center",
              //     alignItems: "center",
              //     borderRadius: 90,
              //     borderWidth: 1,
              //     marginVertical: -16,
              //   },
              // ]}
              // contentStyle={{
              //   height: dialPadSize / 1.2,
              //   width: dialPadSize / 1.1,
              //   paddingVertical: 8,
              //   marginVertical: 2,
              //   marginHorizontal: 8,
              // }}
              style={[
                {
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 90,
                  marginVertical: -4,
                  marginHorizontal: 12,
                },
              ]}
              contentStyle={{
                height: dialPadSize / 1.2,
                width: dialPadSize / 1.2,
                marginVertical: 2,
                marginHorizontal: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              labelStyle={{
                fontSize: dialPadTextSize / 1.2,
                fontWeight: "bold",
                lineHeight: dialPadTextSize * 1.2,
              }}
              // mode="outlined"
            >
              {item === -1 ? (
                <Feather
                  name="delete"
                  size={dialPadTextSize / 1.15}
                  color="#3F1D38"
                />
              ) : item === -2 ? (
                ""
              ) : (
                item
              )}
            </Button>
          );
        }}
      />
    </ThemedView>
  );
};

export default DialpadKeypad;

const styles = StyleSheet.create({
  dialPadText: {
    color: "#3F1D38",
  },
});
