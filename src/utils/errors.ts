export class BankingError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number = 500,
        public details?: any
    ) {
        super(message);
        this.name = 'BankingError';
    }
}

export class APIError extends BankingError {
    constructor(message: string, status: number = 500, details?: any) {
        super(message, 'API_ERROR', status, details);
        this.name = 'APIError';
    }
}

export class AuthenticationError extends BankingError {
    constructor(message: string = 'Authentication failed') {
        super(message, 'AUTH_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}

export class TransactionError extends BankingError {
    constructor(message: string, details?: any) {
        super(message, 'TRANSACTION_ERROR', 400, details);
        this.name = 'TransactionError';
    }
}
