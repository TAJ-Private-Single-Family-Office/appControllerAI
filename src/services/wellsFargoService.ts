import axios, { AxiosError } from 'axios';
import { config } from '../config';

export class WellsFargoService {
  private apiClient;
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = config.wellsFargo.apiUrl;
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.wellsFargo.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getAccountInfo(accountId: string) {
    try {
      const response = await this.apiClient.get(`/accounts/${accountId}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(`Wells Fargo API Error: ${error.message}`);
    }
  }

  async createTransaction(data: any) {
    try {
      const response = await this.apiClient.post('/transactions', data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(`Transaction creation failed: ${error.message}`);
    }
  }

  async processTransaction(data: any) {
    return this.createTransaction(data);
  }

  // Additional methods will be implemented based on requirements
}
