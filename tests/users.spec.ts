import { test, expect } from '@playwright/test';


interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
}

test.describe('/users API Endpoint Tests', () => {
    test('should return all users', async ({ request }) => {
        const response = await request.get('/users');

        // Verify status code is good
        expect(response.status()).toBe(200);

        // Verify response body is not empty and 10 users are returned
        const responseBody: User[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody.length).toEqual(10);
  
        // Verify the response structure
        responseBody.forEach(user => {
            expect(user.id).toBeDefined();
            expect(user.name).toBeDefined();
            expect(user.username).toBeDefined();
            expect(user.email).toBeDefined();
            expect(user.address).toBeDefined();
        })
    })
    test('should return a single user', async ({ request }) => {
        const response = await request.get('/users/1')

        // Verify the status is good
        expect(response.status()).toBe(200);

        // Verify correct user and struture is returned
        const responseBody = await response.json();
        expect(responseBody.id).toEqual(1)
    })
    test('should return a 404 status code', async ({ request }) => {
        const response = await request.get('/users/999');
        expect(response.status()).toBe(404);
    })
})