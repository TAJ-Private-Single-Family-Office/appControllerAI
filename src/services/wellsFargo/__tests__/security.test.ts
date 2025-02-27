import { SecurityService } from '../security';
import crypto from 'crypto';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn().mockImplementation((size: number) => {
    // Return different values for each call
    const mockValues: { [key: number]: Buffer } = {
      12: Buffer.from('123456789012'), // IV
      32: Buffer.from('12345678901234567890123456789012'), // Key
      16: Buffer.from('1234567890123456') // Auth tag
    };
    return mockValues[size] || Buffer.alloc(size);
  })
}));

describe('SecurityService', () => {
  let securityService: SecurityService;
  const testData = 'sensitive-banking-data';

  beforeEach(() => {
    securityService = new SecurityService();
  });

  it('should encrypt and decrypt data correctly', () => {
    const { encrypted, iv, authTag } = securityService.encrypt(testData);
    expect(encrypted).toBeDefined();
    expect(iv).toBeDefined();
    expect(authTag).toBeDefined();

    const decrypted = securityService.decrypt(encrypted, iv, authTag);
    expect(decrypted).toBe(testData);
  });

  it('should generate different IVs for same data', () => {
    const result1 = securityService.encrypt(testData);
    const result2 = securityService.encrypt(testData);

    expect(result1.iv).not.toBe(result2.iv);
    expect(result1.encrypted).not.toBe(result2.encrypted);
  });

  it('should rotate keys after specified interval', () => {
    jest.useFakeTimers();
    const initialKey = (securityService as any).encryptionKey;
    
    // Advance time past rotation interval
    jest.advanceTimersByTime(25 * 60 * 60 * 1000); // 25 hours
    
    securityService.encrypt(testData); // This should trigger key rotation
    const newKey = (securityService as any).encryptionKey;
    
    expect(newKey).not.toEqual(initialKey);
    jest.useRealTimers();
  });

  it('should throw error when decrypting with invalid auth tag', () => {
    const { encrypted, iv } = securityService.encrypt(testData);
    const invalidAuthTag = Buffer.alloc(16).toString('hex');

    expect(() => {
      securityService.decrypt(encrypted, iv, invalidAuthTag);
    }).toThrow();
  });

  it('should throw error when decrypting with invalid iv', () => {
    const { encrypted, authTag } = securityService.encrypt(testData);
    const invalidIv = Buffer.alloc(12).toString('hex');

    expect(() => {
      securityService.decrypt(encrypted, invalidIv, authTag);
    }).toThrow();
  });
});
