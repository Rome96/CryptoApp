export class Crypto {
  constructor(
    public id: string,
    public symbol: string,
    public name: string,
    public price_usd: number,
    public percent_change_1h?: string | undefined,
    public percent_change_24h?: string | undefined,
    public percent_change_7d?: string | undefined
  ) { }
}