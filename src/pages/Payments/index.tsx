import { Payment, columns, PAYMENT_STATUS } from "./columns";
import { DataTable } from "./dataTable";
import { faker } from '@faker-js/faker';

export function createRandomData(): Payment {
    return {
        id: faker.datatype.uuid(),
        name: faker.person.fullName(),
        phoneNumber: faker.phone.number('501-###-###'),
        amount: faker.number.int({ min: 0, max: 1000 }),
        status: faker.helpers.enumValue(PAYMENT_STATUS),
        email: faker.internet.email(),
    };
}

const Payments = () => {
    const getData = (): Payment[] => {
        return faker.helpers.multiple(createRandomData, {
            count: 5000,
        })
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={getData()} />
        </div>
    )
};

export default Payments;