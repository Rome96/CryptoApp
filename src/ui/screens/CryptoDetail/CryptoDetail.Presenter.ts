import { useEffect, useRef, useState } from 'react'
import { CryptoApi } from '../../../infrastructure/api/CryptoApi';
import { Crypto } from '../../../domain/entities/Crypto';
import { Animated } from 'react-native';

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

  return {
    crypto,
    loading,
    opacity,
    translateY
  }
}

export default CryptoDetailPresenter
