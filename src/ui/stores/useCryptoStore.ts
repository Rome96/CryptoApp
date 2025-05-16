import { create } from 'zustand';
import { Crypto } from '../../domain/entities/Crypto';
import { CryptoApi } from '../../infrastructure/api/CryptoApi';

const cryptoApi = new CryptoApi();

interface CryptoStore {
  cryptos: Crypto[];
  isLoading: boolean;
  fetchCryptos: () => Promise<void>;
  filter: string;
  setFilter: (text: string) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptos: [],
  isLoading: false,
  filter: '',
  setFilter: (text) => set({ filter: text }),
  fetchCryptos: async () => {
    set({ isLoading: true });
    const data = await cryptoApi.getCryptos();
    set({ cryptos: data, isLoading: false });
  },
}));