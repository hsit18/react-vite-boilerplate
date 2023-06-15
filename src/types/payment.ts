export enum PAYMENT_STATUS {
  PENDING = "pending",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
}

export type Payment = {
  id: string
  name: string
  phoneNumber: string
  email: string
  amount: number
  status: PAYMENT_STATUS
}