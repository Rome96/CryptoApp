import { act } from '@testing-library/react-hooks';
import { CryptoApi } from '../../../infrastructure/api/CryptoApi';
import { useCryptoStore } from '../../../ui/stores/useCryptoStore';

// Mock the CryptoApi
jest.mock('../../../infrastructure/api/CryptoApi');

describe('useCryptoStore', () => {
  const mockedGetCryptos = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (CryptoApi as jest.Mock).mockImplementation(() => {
      return {
        getCryptos: mockedGetCryptos,
      };
    });
  });

  it('should have initial state', () => {
    const state = useCryptoStore.getState();

    expect(state.cryptos).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.filter).toBe('');
    expect(typeof state.setFilter).toBe('function');
    expect(typeof state.fetchCryptos).toBe('function');
  });

  it('setFilter updates filter state', () => {
    act(() => {
      useCryptoStore.getState().setFilter('bitcoin');
    });
    const filter = useCryptoStore.getState().filter;
    expect(filter).toBe('bitcoin');
  });

  it('fetchCryptos fetches data and updates state', async () => {
    const fakeCryptos = [
      { id: '1', name: 'Bitcoin', symbol: 'btc', price_usd: 42000 },
      { id: '2', name: 'Ethereum', symbol: 'eth', price_usd: 3000 },
    ];
    mockedGetCryptos.mockResolvedValue(fakeCryptos);

    // Run fetchCryptos action
    await act(async () => {
      await useCryptoStore.getState().fetchCryptos();
    });

    const state = useCryptoStore.getState();
    expect(state.isLoading).toBe(false);
  });

  it('fetchCryptos sets isLoading correctly', async () => {
    mockedGetCryptos.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 50))
    );

    const promise = act(async () => {
      useCryptoStore.getState().fetchCryptos();
    });

    // isLoading should be true immediately after calling fetchCryptos
    expect(useCryptoStore.getState().isLoading).toBe(true);

    await promise;

    expect(useCryptoStore.getState().isLoading).toBe(false);
  });
});
