import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated, Dimensions } from "react-native";
import CryptoDetailPresenter from "./CryptoDetail.Presenter";
import { Stack } from "expo-router";
import { colors } from "../../../utilities/color";
import { LineChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: colors.green,
  },
};


export default function CryptoDetailScreen({ id }: { id: string | undefined }) {
  const { crypto, loading, opacity, translateY } = CryptoDetailPresenter({ id });

  if (loading) {
    return <ActivityIndicator testID="ActivityIndicator" style={{ marginTop: 20 }} />;
  }

  if (!crypto) {
    return <Text style={{ marginTop: 20 }}>Crypto not found</Text>;
  }


  const data = {
    labels: ["1h", "24h", "7d"],
    datasets: [
      {
        data: [
          parseFloat(crypto.percent_change_1h ?? "0"),
          parseFloat(crypto.percent_change_24h ?? "0"),
          parseFloat(crypto.percent_change_7d ?? "0"),
        ],
      },
    ],
  };

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
        <LineChart
          bezier
          fromZero
          data={data}
          height={200}
          yAxisLabel={""}
          yAxisSuffix={"%"}
          style={styles.chart}
          width={screenWidth - 80}
          chartConfig={chartConfig}
        />
      </Animated.View>
    </React.Fragment>
  );
}

const ITEM_PADDING = 20;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    padding: ITEM_PADDING,
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
  chart: {
    marginVertical: 16,
    borderRadius: 8,
  },
});
