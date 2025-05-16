import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, StyleSheet, Animated, ActivityIndicator, Dimensions, Text } from "react-native";

import { colors } from "../../../utilities/color";
import { CryptoCard } from "../../components/CryptoCard";
import CryptoListPresenter from "./CryptoList.Presenter";
import { SearchInput } from "../../components/SearchInput";

const screenWidth = Dimensions.get("window").width;

/**
 * Screen component that displays a searchable and scrollable list of cryptocurrencies.
 * It shows a loading indicator while fetching data, a 24-hour variation chart, and
 * a list of filtered crypto cards with scroll animations.
 *
 * @component
 * @returns {JSX.Element} The rendered CryptoListScreen component.
 */

export const CryptoListScreen = () => {
  const { filtered, scrollY, isLoading, chartData } = CryptoListPresenter();

  if (isLoading) {
    return <ActivityIndicator testID="loading-indicator" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <SearchInput />
      {chartData?.labels?.length && chartData?.datasets?.[0]?.data?.length ? (
        <View style={styles.chartWrapper}>
          <Text style={styles.chartTitle}>24h Cryptocurrency Variation</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            fromZero
            yAxisSuffix="%"
            style={styles.chart}
          />
        </View>
      ) : null}

      <Animated.FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <CryptoCard crypto={item} index={index} scrollY={scrollY} />
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.secondary,
  },
  chartWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.gallery,
  },
  chart: {
    borderRadius: 8,
  },
});

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: colors.green,
  },
};