import { Crypto } from "../entities/Crypto";

export interface CryptoRepository {
  getCryptos(): Promise<Crypto[]>;
  getCryptoById(id: string): Promise<Crypto | null>;
}