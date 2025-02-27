import { encrypt, decrypt } from '../utils/encryption';

export class SecurityService {
  private static readonly STORAGE_KEY = 'secure_api_keys';

  static async updateApiKeys(keys: {
    wellsFargoApiKey: string;
    wellsFargoSecret: string;
  }): Promise<void> {
    const encrypted = await encrypt(JSON.stringify(keys));
    localStorage.setItem(this.STORAGE_KEY, encrypted);
  }

  static async getApiKeys(): Promise<{
    wellsFargoApiKey: string;
    wellsFargoSecret: string;
  } | null> {
    const encrypted = localStorage.getItem(this.STORAGE_KEY);
    if (!encrypted) return null;
    
    const decrypted = await decrypt(encrypted);
    return JSON.parse(decrypted);
  }
}
