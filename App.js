import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FoodManage from "./Screen/FoodManage";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FoodManage></FoodManage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
