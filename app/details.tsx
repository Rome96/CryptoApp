import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CryptoDetailScreen from "../src/ui/screens/CryptoDetail/CryptoDetailScreen";
import { colors } from "../src/utilities/color";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <CryptoDetailScreen id={id as string} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  }
});
export default DetailsScreen;
