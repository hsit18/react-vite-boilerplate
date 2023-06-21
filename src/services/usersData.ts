import { faker } from '@faker-js/faker';
import { User, GENDER_TYPE, APPROVAL_STATUS, UserApiResponse } from "@/types/user";

export function createRandomData(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number('501-###-###'),
    email: faker.internet.email(),
    gender: faker.helpers.enumValue(GENDER_TYPE),
    status: faker.helpers.enumValue(APPROVAL_STATUS)
  };
}

export const getData = (): User[] => {
  return faker.helpers.multiple(createRandomData, {
    count: 5000,
  })
}

const data = getData();

export const getPaginatedUserData = (pageIndex: number, pageSize: number): Promise<UserApiResponse> => {
  console.log(pageIndex, pageSize)
  return new Promise((resolve) => setTimeout(() => resolve({
    data: data.slice((pageIndex) * pageSize, (pageIndex + 1) * pageSize),
    totalRecords: 5000
  }), 500));
}