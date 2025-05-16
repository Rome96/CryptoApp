import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";
import CryptoDetailPresenter from "./CryptoDetail.Presenter";
import { Stack } from "expo-router";
import { colors } from "../../../utilities/color";

export default function CryptoDetailScreen({ id }: { id: string | undefined }) {
  const { crypto, loading, opacity, translateY } = CryptoDetailPresenter({ id });

  useEffect(() => {
    if (crypto) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [crypto]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  if (!crypto) {
    return <Text style={{ marginTop: 20 }}>Crypto not found</Text>;
  }

  return (
    <React.Fragment>
      <Stack.Screen options={{ title: `Detail - ${crypto.name}` }} />
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.name}>{crypto.name}</Text>
          <Text style={styles.symbol}>({crypto.symbol.toUpperCase()})</Text>
        </View>
        <Text style={styles.price}>${crypto.price_usd.toFixed(2)} USD</Text>
      </Animated.View>
    </React.Fragment>
  );
}

const ITEM_PADDING = 20;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    padding: ITEM_PADDING * 3,
    margin: 20,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gallery,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.alto,
    marginLeft: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.green,
    marginTop: 10,
  },
});
