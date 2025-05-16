const URL_BAE = "https://api.coinlore.net/api/"

export const PATH = {
  getAllCrypto: `${URL_BAE}tickers/`,
  getAllCryptoChart: `${URL_BAE}tickers/?limit=5`,
  getCryptoById: `${URL_BAE}ticker/?id=`,
}