export interface AccountDetails {
    accountId: string;
    accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT';
    balance: number;
    currency: string;
    lastUpdated: Date;
}

export interface BankingTransaction {
    id: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    type: 'transfer' | 'deposit' | 'withdrawal' | 'payment';
    timestamp: string;
    status: 'pending' | 'completed' | 'failed';
    metadata?: {
        location?: string;
        description?: string;
        category?: string;
    };
}

export interface AccountBalance {
    accountId: string;
    currentBalance: number;
    availableBalance: number;
    currency: string;
    lastUpdated: string;
}

export interface TransactionAnalytics {
    fraudScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    insights: string[];
    predictedCategory?: string;
}

export type TransactionType = 
    | 'TRANSFER'
    | 'PAYMENT'
    | 'DEPOSIT'
    | 'WITHDRAWAL';

export type TransactionStatus = 
    | 'PENDING'
    | 'COMPLETED'
    | 'FAILED'
    | 'REVERSED';
