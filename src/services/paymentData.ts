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

export const getPaymentData = (): Promise<Payment[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(faker.helpers.multiple(createRandomData, {
    count: 5000,
  })), 5000));
}