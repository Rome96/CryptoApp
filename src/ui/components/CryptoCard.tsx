import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Crypto } from "../../domain/entities/Crypto";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utilities/color";
import { ITEM_MARGIN_BOTTOM, ITEM_PADDING, ITEM_SIZE } from "../../utilities/generalFunction";

interface ICryptoCardProps {
  crypto: Crypto;
  index: number;
  scrollY: Animated.Value;
}

/**
 * CryptoCard component renders individual cryptocurrency information inside an animated card.
 * It scales the card size based on scroll position for a smooth animation effect.
 *
 * @param {ICryptoCardProps} props - Props containing crypto data, index, and scroll animated value.
 * @returns {JSX.Element} Animated card component with crypto info and navigation on press.
 */

export const CryptoCard = ({ crypto, index, scrollY }: ICryptoCardProps) => {
  const router = useRouter();

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
    outputRange: [1, 1, 1, 0.9],
    extrapolate: "clamp",
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
