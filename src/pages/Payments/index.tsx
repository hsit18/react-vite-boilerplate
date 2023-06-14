import { Payment, columns } from "./columns";
import { DataTable } from "./dataTable";
import { faker } from '@faker-js/faker';

export function createRandomData(): Payment {
    return {
        id: faker.datatype.uuid(),
        amount: faker.number.int({min: 0, max: 1000}),
        status: "pending",
        email: faker.internet.email(),
    };
}


const Payments = () => {
    const getData = (): Payment[] => {
        return faker.helpers.multiple(createRandomData, {
            count: 50,
          })
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={getData()} />
        </div>
    )
};

export default Payments;