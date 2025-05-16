import { Crypto } from '../../../domain/entities/Crypto';
import { PATH } from '../../../application/services/CryptoService';
import { CryptoApi } from '../../../infrastructure/api/CryptoApi';

describe('CryptoApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('getCryptos should fetch and map data correctly', async () => {
    const fakeApiResponse = {
      data: [
        { id: '1', symbol: 'btc', name: 'Bitcoin', price_usd: '42000' },
        { id: '2', symbol: 'eth', name: 'Ethereum', price_usd: '3000' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeApiResponse),
    });

    const api = new CryptoApi();
    const result = await api.getCryptos();

    expect(fetch).toHaveBeenCalledWith(PATH.getAllCrypto);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Crypto);
    expect(result[0].id).toBe('1');
    expect(result[0].name).toBe('Bitcoin');
    expect(result[0].price_usd).toBeCloseTo(42000);
  });

  it('getCryptoById should fetch and map a single crypto correctly', async () => {
    const fakeApiResponse = [
      { id: '1', symbol: 'btc', name: 'Bitcoin', price_usd: '42000' },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeApiResponse),
    });

    const api = new CryptoApi();
    const result = await api.getCryptoById('1');

    expect(fetch).toHaveBeenCalledWith(`${PATH.getCryptoById}1`);
    expect(result).toBeInstanceOf(Crypto);
    expect(result?.id).toBe('1');
    expect(result?.name).toBe('Bitcoin');
    expect(result?.price_usd).toBeCloseTo(42000);
  });
});
