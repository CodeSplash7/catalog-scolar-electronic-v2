export interface SubscriptionDocument {
  status: SubscriptionStatus;
  type: SubscriptionType;
  startDate: string | null;
  endDate: string | null;
  nextPaymentDate: string;
  paymentHistory: Payment[];
  freeTrial: boolean;
  trialDuration: number | null;
}

export interface Payment {
  date: string;
  amount: number;
  method: string;
  status: string;
}

export type SubscriptionStatus = "active" | "inactive";
export type SubscriptionType = "monthly" | "annual";
