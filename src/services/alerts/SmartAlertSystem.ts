import { EventEmitter } from 'events';

interface Transaction {
  amount: number;
  type: string;
  timestamp: Date;
  category?: string;
}

export class SmartAlertSystem {
  private events: EventEmitter;
  private thresholds: Map<string, number>;
  private transactionHistory: Transaction[] = [];

  constructor() {
    this.events = new EventEmitter();
    this.thresholds = new Map();
  }

  setThreshold(category: string, amount: number) {
    this.thresholds.set(category, amount);
  }

  analyzeTransaction(transaction: Transaction) {
    this.transactionHistory.push(transaction);
    
    // Check thresholds
    const threshold = this.thresholds.get(transaction.category || 'default');
    if (threshold && transaction.amount > threshold) {
      this.events.emit('threshold-exceeded', {
        category: transaction.category,
        amount: transaction.amount,
        threshold
      });
    }

    // Analyze patterns
    this.analyzePatternsForAnomalies();
  }

  private analyzePatternsForAnomalies() {
    // Implement pattern analysis logic here
    const recentTransactions = this.transactionHistory.slice(-10);
    // Add pattern detection logic
  }

  onAlert(callback: (alert: any) => void) {
    this.events.on('threshold-exceeded', callback);
  }
}
