import { View, Text, StyleSheet } from "react-native";
import { Crypto } from "../../domain/entities/Crypto";

interface ICryptoCardProps {
   crypto: Crypto 
}

export const CryptoCard = ({ crypto }: ICryptoCardProps) => (
  <View style={styles.card}>
    <Text style={styles.name}>
      {crypto.name} ({crypto.symbol})
    </Text>
    <Text style={styles.price}>${crypto.price_usd.toFixed(2)} USD</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  price: {
    fontSize: 14,
    color: "green"
  },
});
