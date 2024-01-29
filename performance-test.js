import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const baseURL = 'https://reqres.in';  // Ganti dengan URL sesuai kebutuhan

export const options = {
    vus: 1000,  // Jumlah Virtual Users
    iterations: 3500,  // Jumlah Iterasi total
    thresholds: {
        'http_req_duration': ['p(95)<2000'],  // Toleransi response time maksimum 2 detik
    },
};

export default function () {
    // Test POST API
    const createResponse = http.post(`${baseURL}/api/users`, {});
    check(createResponse, {
        'Create API is successful': (resp) => resp.status === 201,
    });

    // Test PUT API
    const updateResponse = http.put(`${baseURL}/api/users/2`, {});
    check(updateResponse, {
        'Update API is successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
