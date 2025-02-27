import axios from 'axios';
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
    } catch (error) {
      throw new Error(`Wells Fargo API Error: ${error.message}`);
    }
  }

  // Additional methods will be implemented based on requirements
}
