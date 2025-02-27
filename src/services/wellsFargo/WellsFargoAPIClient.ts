import axios, { AxiosInstance } from 'axios';
import { createHmac } from 'crypto';

export class WellsFargoAPIClient {
  private client: AxiosInstance;
  private apiKey: string;
  private apiSecret: string;

  constructor(config: {
    apiKey: string;
    apiSecret: string;
    baseURL: string;
  }) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
    });
  }

  private signRequest(payload: string): string {
    return createHmac('sha256', this.apiSecret)
      .update(payload)
      .digest('hex');
  }

  async getAccountInfo(accountId: string) {
    const signature = this.signRequest(accountId);
    return this.client.get(`/accounts/${accountId}`, {
      headers: { 'X-Signature': signature },
    });
  }

  async getTransactionHistory(accountId: string, dateRange?: { start: Date; end: Date }) {
    const payload = JSON.stringify({ accountId, dateRange });
    const signature = this.signRequest(payload);
    return this.client.get(`/accounts/${accountId}/transactions`, {
      headers: { 'X-Signature': signature },
      params: dateRange,
    });
  }

  async initiateTransfer(from: string, to: string, amount: number) {
    const payload = JSON.stringify({ from, to, amount });
    const signature = this.signRequest(payload);
    return this.client.post('/transfers', { from, to, amount }, {
      headers: { 'X-Signature': signature },
    });
  }

  async getBalance(accountId: string) {
    const signature = this.signRequest(accountId);
    return this.client.get(`/accounts/${accountId}/balance`, {
      headers: { 'X-Signature': signature },
    });
  }
}
