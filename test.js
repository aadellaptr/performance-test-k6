import http from 'k6/http';
import { check, sleep } from 'k6';

const baseURL = 'https://reqres.in';

const createBody = {
    name: 'morpheus',
    job: 'leader',
};

const updateBody = {
    name: 'morpheus',
    job: 'zion resident',
};

export const options = {
    vus: 10,  // Jumlah Virtual Users
    iterations: 10,  // Jumlah Iterasi per VUs
};

export default function () {
    // Test POST API
    const createResponse = http.post(`${baseURL}/api/users`, createBody);
    check(createResponse, {
        'Create API is successful': (resp) => resp.status === 201,
    });

    // Test PUT API
    const updateResponse = http.put(`${baseURL}/api/users/2`, updateBody);
    check(updateResponse, {
        'Update API is successful': (resp) => resp.status === 200,
    });

    sleep(1);
}
