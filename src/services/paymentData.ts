import { faker } from '@faker-js/faker';
import { Payment, PAYMENT_STATUS } from "@/types/payment";

export function createRandomData(): Payment {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number('501-###-###'),
    amount: faker.number.int({ min: 0, max: 1000 }),
    status: faker.helpers.enumValue(PAYMENT_STATUS),
    email: faker.internet.email(),
  };
}

export const getData = (): Payment[] => {
  return faker.helpers.multiple(createRandomData, {
    count: 5000,
  })
}

const data = getData();

export const getPaymentData = (): Promise<Payment[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(faker.helpers.multiple(createRandomData, {
    count: 5000,
  })), 5000));
}

export const getPaginatedPaymentData = (pageIndex: number, pageSize: number): Promise<Payment[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)), 1000));
}