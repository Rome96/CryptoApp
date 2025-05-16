import { Animated } from 'react-native'
import React, { useEffect } from 'react'
import { useCryptoStore } from '../../stores/useCryptoStore';

const CryptoListPresenter = () => {
  const { fetchCryptos, cryptos, filter, isLoading } = useCryptoStore();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    fetchCryptos();
  }, []);

  const filtered = cryptos.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));
  
  return {
    filtered,
    scrollY,
    isLoading,
  }
}

export default CryptoListPresenter