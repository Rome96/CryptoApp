import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Crypto } from "../../domain/entities/Crypto";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utilities/color";

interface ICryptoCardProps {
  crypto: Crypto;
  index: number;
  scrollY: Animated.Value;
}

export const ITEM_MARGIN_BOTTOM = 20;
export const ITEM_PADDING = 20;
export const ITEM_SIZE = 53 + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM; // this height if one item in the list

export const CryptoCard = ({ crypto, index, scrollY }: ICryptoCardProps) => {
  const router = useRouter();

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 3)],
    outputRange: [1, 1, 1, 0],
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/details?id=${crypto.id}`)}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{crypto.name}</Text>
            <Text style={styles.symbol}>({crypto.symbol.toUpperCase()})</Text>
          </View>
          <Text style={styles.price}>${crypto.price_usd.toFixed(2)} USD</Text>
        </View>
        <AntDesign name="right" size={24} color={colors.gallery} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    padding: ITEM_PADDING,
    marginBottom: ITEM_MARGIN_BOTTOM,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
    display: "flex",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gallery,
  },
  symbol: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.alto,
    marginLeft: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.green,
  },
});
