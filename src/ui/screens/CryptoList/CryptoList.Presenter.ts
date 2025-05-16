import { Animated } from 'react-native'
import React, { useEffect } from 'react'
import { useCryptoStore } from '../../stores/useCryptoStore';
import { prepareChartData } from '../../../utilities/generalFunction';

/**
 * Presenter hook for managing the state and logic of the CryptoListScreen.
 * 
 * - Fetches the list of cryptocurrencies on mount.
 * - Filters cryptocurrencies based on the current filter state.
 * - Prepares chart data for the top 6 cryptocurrencies.
 * - Provides an Animated.Value to track vertical scroll position.
 * 
 * @returns {Object} An object containing:
 * @property - filtered {Array} Filtered list of cryptocurrencies by name.
 * @property - {Animated.Value} Animated value tracking scroll position.
  * @property - {boolean} Loading state for fetching cryptos.
  * @property - {Array} Full list of cryptocurrencies.
 * @property - {Object} Data formatted for the chart component.
 */

const CryptoListPresenter = () => {
  const { fetchCryptos, cryptos, filter, isLoading } = useCryptoStore();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  

  useEffect(() => {
    fetchCryptos();
  }, []);

  const filtered = cryptos.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));

  const chartData = prepareChartData(cryptos.slice(0, 6));

  return {
    filtered,
    scrollY,
    isLoading,
    cryptos,
    chartData
  }
}

export default CryptoListPresenter