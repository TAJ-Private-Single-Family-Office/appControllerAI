import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AIService } from '../services/AIService';
import { BankingTransaction } from '../types/banking';

describe('AIService', () => {
    let aiService: AIService;

    beforeEach(() => {
        aiService = new AIService();
    });

    describe('detectFraud', () => {
        it('should detect high-risk transactions', async () => {
            const suspiciousTransaction: BankingTransaction = {
                id: '123',
                amount: 50000,
                fromAccount: 'acc1',
                toAccount: 'acc2',
                type: 'transfer',
                timestamp: new Date().toISOString(),
                status: 'pending',
                metadata: {
                    location: 'Unknown'
                }
            };

            const result = await aiService.detectFraud(suspiciousTransaction);
            expect(result).toBe(true);
        });
    });

    // Add more test cases...
});
