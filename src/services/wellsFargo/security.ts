import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class SecurityService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyRotationInterval = 24 * 60 * 60 * 1000; // 24 hours

  private encryptionKey: Buffer;
  private lastKeyRotation: number;

  constructor() {
    this.rotateKey();
  }

  private rotateKey() {
    this.encryptionKey = randomBytes(32);
    this.lastKeyRotation = Date.now();
  }

  encrypt(data: string): { encrypted: string; iv: string; authTag: string } {
    if (Date.now() - this.lastKeyRotation > this.keyRotationInterval) {
      this.rotateKey();
    }

    const iv = randomBytes(12);
    const cipher = createCipheriv(this.algorithm, this.encryptionKey, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: cipher.getAuthTag().toString('hex'),
    };
  }

  decrypt(encrypted: string, iv: string, authTag: string): string {
    const decipher = createDecipheriv(
      this.algorithm,
      this.encryptionKey,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
