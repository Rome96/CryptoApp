import { renderHook,  } from '@testing-library/react-hooks';
import CryptoListPresenter from "../../../../ui/screens/CryptoList/CryptoList.Presenter";

import { Animated } from 'react-native';
import { useCryptoStore } from '../../../../ui/stores/useCryptoStore';

// Mock the store
jest.mock('../../../../ui/stores/useCryptoStore');

describe('CryptoListPresenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchCryptos on mount and returns filtered cryptos and loading state', () => {
    const fetchCryptosMock = jest.fn();
    const cryptosMock = [
      { id: '1', name: 'Bitcoin', symbol: 'btc', price_usd: 40000 },
      { id: '2', name: 'Ethereum', symbol: 'eth', price_usd: 3000 },
      { id: '3', name: 'Cardano', symbol: 'ada', price_usd: 2 },
    ];
    const filterMock = 'eth';
    const isLoadingMock = false;

    // Mock implementation of useCryptoStore
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      fetchCryptos: fetchCryptosMock,
      cryptos: cryptosMock,
      filter: filterMock,
      isLoading: isLoadingMock,
    });

    const { result } = renderHook(() => CryptoListPresenter());

    // Check fetchCryptos called on mount
    expect(fetchCryptosMock).toHaveBeenCalled();

    // Check filtered cryptos
    expect(result.current.filtered).toEqual([
      { id: '2', name: 'Ethereum', symbol: 'eth', price_usd: 3000 },
    ]);

    // Check isLoading
    expect(result.current.isLoading).toBe(isLoadingMock);

    // Check scrollY is Animated.Value
    expect(result.current.scrollY).toBeInstanceOf(Animated.Value);
  });

  it('returns empty filtered when filter does not match', () => {
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      fetchCryptos: jest.fn(),
      cryptos: [{ id: '1', name: 'Bitcoin', symbol: 'btc', price_usd: 40000 }],
      filter: 'xyz',
      isLoading: false,
    });

    const { result } = renderHook(() => CryptoListPresenter());

    expect(result.current.filtered).toEqual([]);
  });

  it('filter is case insensitive', () => {
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      fetchCryptos: jest.fn(),
      cryptos: [{ id: '1', name: 'Bitcoin', symbol: 'btc', price_usd: 40000 }],
      filter: 'BIT',
      isLoading: false,
    });

    const { result } = renderHook(() => CryptoListPresenter());

    expect(result.current.filtered).toEqual([
      { id: '1', name: 'Bitcoin', symbol: 'btc', price_usd: 40000 },
    ]);
  });
});
