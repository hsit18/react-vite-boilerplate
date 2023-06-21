export enum APPROVAL_STATUS {
  PENDING = "pending",
  ACTIVATED = "activated"
}

export enum GENDER_TYPE {
  MALE = "male",
  FEMALE = "female"
}


export type User = {
  id: string
  name: string
  gender: GENDER_TYPE
  phoneNumber: string
  email: string
  status: APPROVAL_STATUS
}

export type UserApiResponse = {
  data: User[],
  totalRecords: number
}