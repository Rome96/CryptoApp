import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useCryptoStore } from '../../stores/useCryptoStore';

const CryptoListPresenter = () => {
  const { fetchCryptos, cryptos, filter, setFilter } = useCryptoStore();

  useEffect(() => {
    fetchCryptos();
  }, []);

  const filtered = cryptos.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));
  
  return {
    filtered ,
    setFilter
  }
}

export default CryptoListPresenter