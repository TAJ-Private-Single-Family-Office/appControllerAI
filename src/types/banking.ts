export interface AccountDetails {
    accountId: string;
    accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT';
    balance: number;
    currency: string;
    lastUpdated: Date;
}

export interface BankingTransaction {
    id?: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    type: TransactionType;
    timestamp: string;
    status: TransactionStatus;
    metadata?: TransactionMetadata;
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
    | 'transfer'
    | 'withdrawal'
    | 'deposit'
    | 'payment';

export type TransactionStatus = 
    | 'pending'
    | 'completed'
    | 'failed'
    | 'cancelled';

export interface TransactionMetadata {
    location?: string;
    device?: string;
    ipAddress?: string;
    userAgent?: string;
    [key: string]: any;
}
