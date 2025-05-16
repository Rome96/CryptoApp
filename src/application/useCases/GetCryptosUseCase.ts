import { CryptoRepository } from "../../domain/repositories/CryptoRepository";

export class GetCryptosUseCase {
  constructor(private cryptoRepo: CryptoRepository) { }
  async execute() {
    return this.cryptoRepo.getCryptos();
  }
}