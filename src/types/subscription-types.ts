export interface Subscription {
  id: string; // ObjectId
  status: string; // e.g., "active", "inactive", etc.
  type: string; // e.g., "monthly", "annual", etc.
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  nextPaymentDate: string; // ISO date string
  paymentHistory: Payment[];
}

export interface Payment {
  date: string; // ISO date string
  amount: number; // Amount in currency
  method: string; // e.g., "credit_card", "paypal", etc.
  status: string; // e.g., "successful", "failed", etc.
}
