import { Crypto } from "../../domain/entities/Crypto";
import { CryptoRepository } from "../../domain/repositories/CryptoRepository";

export class CryptoApi implements CryptoRepository {
  async getCryptos(): Promise<Crypto[]> {
    const response = await fetch("https://api.coinlore.net/api/tickers/");
    const data = await response.json();
    return data.data.map(
      (item: any) => new Crypto(item.id, item.symbol, item.name, parseFloat(item.price_usd))
    );
  }

  async getCryptoById(id: string): Promise<Crypto | null> {
    const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${id}`);
    const data = await response.json();
    const item = data[0];
    return new Crypto(item.id, item.symbol, item.name, parseFloat(item.price_usd));
  }
}