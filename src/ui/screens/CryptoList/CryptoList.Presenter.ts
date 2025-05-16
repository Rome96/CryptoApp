import { Animated } from 'react-native'
import React, { useEffect } from 'react'
import { useCryptoStore } from '../../stores/useCryptoStore';
import { prepareChartData } from '../../../utilities/generalFunction';

const CryptoListPresenter = () => {
  const { fetchCryptos, cryptos, filter, isLoading } = useCryptoStore();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  

  useEffect(() => {
    fetchCryptos();
  }, []);

  const filtered = cryptos.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));

  const rawChartData = prepareChartData(cryptos.slice(0, 6));

  const cleanedChartData = {
    labels: rawChartData?.labels || [],
    datasets: [
      {
        data: (rawChartData?.datasets?.[0]?.data || []).map((v) => {
          const n = Number(v);
          return isFinite(n) ? n : 0;
        }),
      },
    ],
  };

  return {
    filtered,
    scrollY,
    isLoading,
    cryptos,
    chartData: rawChartData
  }
}

export default CryptoListPresenter