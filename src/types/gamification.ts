export interface UserAchievement {
  id: string;
  userId: string;
  type: string;
  earnedAt: Date;
  points: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  points: number;
  requirements: string[];
}

export type ActionType = 'savings-goal-met' | 'regular-login' | 'bill-paid-ontime';
