export type NotificationType = 
  | 'TRANSACTION_ALERT'
  | 'SECURITY_ALERT'
  | 'BALANCE_ALERT'
  | 'FRAUD_ALERT';

export interface NotificationConfig {
  type: NotificationType;
  threshold?: number;
  enabled: boolean;
}
