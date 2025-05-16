import { Crypto } from "../domain/entities/Crypto";

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

