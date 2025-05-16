import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CryptoListScreen } from "../src/ui/screens/CryptoList/CryptoListScreen";
import { Stack } from "expo-router";
import { colors } from "../src/utilities/color";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <CryptoListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  }
});
