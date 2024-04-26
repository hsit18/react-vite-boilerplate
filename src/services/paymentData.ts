import { faker } from '@faker-js/faker';
import { Payment, PAYMENT_STATUS } from "@/types/payment";

export function createRandomData(): Payment {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    amount: faker.number.int({ min: 0, max: 1000 }),
    status: faker.helpers.enumValue(PAYMENT_STATUS),
    email: faker.internet.email(),
    company: faker.company.name()
  };
}

export const getData = (): Payment[] => {
  return faker.helpers.multiple(createRandomData, {
    count: 5000,
  })
}

const data = getData();

export const getPaymentData = (): Promise<Payment[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 100));
}

export const getPaginatedPaymentData = (pageIndex: number, pageSize: number): Promise<{ data: Payment[], total: number }> => {
  return new Promise((resolve) => setTimeout(() => resolve({
    total: data.length,
    data: data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  }), 1000));
}
