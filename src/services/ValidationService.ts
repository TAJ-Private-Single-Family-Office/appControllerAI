import { z } from 'zod';
import { BankingTransaction, TransactionType, TransactionStatus } from '../types/banking';

export class ValidationService {
    private transactionSchema = z.object({
        id: z.string().uuid(),
        fromAccount: z.string().min(8).max(34),
        toAccount: z.string().min(8).max(34),
        amount: z.number().positive(),
        type: z.enum(['transfer', 'deposit', 'withdrawal', 'payment']),
        timestamp: z.string().datetime(),
        status: z.enum(['pending', 'completed', 'failed']),
        metadata: z.object({
            location: z.string().optional(),
            description: z.string().optional(),
            category: z.string().optional()
        }).optional()
    });

    validateTransaction(transaction: BankingTransaction): { 
        success: boolean; 
        errors?: string[] 
    } {
        try {
            this.transactionSchema.parse(transaction);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                errors: error.errors.map(e => e.message)
            };
        }
    }
}
