import { View, Text, StyleSheet, Animated } from "react-native";
import { Crypto } from "../../domain/entities/Crypto";

interface ICryptoCardProps {
  crypto: Crypto;
  index: number;
  scrollY: Animated.Value;
}

export const ITEM_MARGIN_BOTTOM = 20;
export const ITEM_PADDING = 20;
export const ITEM_SIZE = 53 + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM; // this height if one item in the list

export const CryptoCard = ({ crypto, index, scrollY }: ICryptoCardProps) => {
  const scale = scrollY.interpolate({
    inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 3)],
    outputRange: [1, 1, 1, 0],
  });
  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <View style={styles.header}>
        <Text style={styles.name}>{crypto.name}</Text>
        <Text style={styles.symbol}>({crypto.symbol.toUpperCase()})</Text>
      </View>
      <Text style={styles.price}>${crypto.price_usd.toFixed(2)} USD</Text>
    </Animated.View>
  );
}; 

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: ITEM_PADDING,
    marginBottom: ITEM_MARGIN_BOTTOM,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f0f0f0",
  },
  symbol: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a0a0a0",
    marginLeft: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4caf50",
  },
});
