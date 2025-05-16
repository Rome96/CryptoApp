import { Crypto } from "../domain/entities/Crypto";

/**
 * Prepares chart data from an array of cryptocurrencies.
 *
 * Extracts the crypto symbols as labels and their 24-hour percentage change
 * as numeric data. Validates the data and returns an object structured
 * for the chart component or null if data is invalid.
 *
 * @param {Crypto[]} cryptoData - Array of Crypto objects with cryptocurrency data.
 * @returns {object|null} Object containing labels, datasets, and legend for the chart,
 *                        or null if the data is invalid.
 */
export const prepareChartData = (cryptoData: Crypto[]) => {
  const labels = cryptoData.map((crypto) => crypto.symbol);
  const data = cryptoData.map((crypto) => {
    const value = parseFloat(crypto.percent_change_24h ?? "0");
    return isNaN(value) ? 0 : value;
  });

  const isValid = labels.length > 0 && data.every((v) => typeof v === "number" && !isNaN(v));

  if (!isValid) {
    return null;
  }

  return {
    labels,
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Cambio en 24h (%)"],
  };
};


export const ITEM_MARGIN_BOTTOM = 20;
export const ITEM_PADDING = 20;
export const ITEM_SIZE = 53 + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM; // this height if one item in the list
