import { useEffect, useRef, useState } from 'react'
import { CryptoApi } from '../../../infrastructure/api/CryptoApi';
import { Crypto } from '../../../domain/entities/Crypto';
import { Animated } from 'react-native';

/**
 * Custom hook that fetches detailed information of a cryptocurrency by its ID,
 * and manages animation states for opacity and vertical translation.
 *
 * @param {Object} params - The input parameters object.
 * @param {string | undefined} params.id - The unique identifier of the cryptocurrency to fetch.
 *
 * @returns {Object} An object containing the crypto data, loading state, and animation values.
 * @property {Crypto | null} crypto - The fetched cryptocurrency data or null if not loaded.
 * @property {boolean} loading - Indicates if the data is still being fetched.
 * @property {Animated.Value} opacity - Animated value for the opacity of the detail view.
 * @property {Animated.Value} translateY - Animated value for the vertical translation of the detail view.
 */
const CryptoDetailPresenter = ({ id }: { id: string | undefined }) => {
  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [loading, setLoading] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    const fetchCrypto = async () => {
      if (!id) return;
      const api = new CryptoApi();
      const data = await api.getCryptoById(id);
      setCrypto(data);
      setLoading(false);
    };
    fetchCrypto();
  }, [id]);

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

  return {
    crypto,
    loading,
    opacity,
    translateY
  }
}

export default CryptoDetailPresenter
