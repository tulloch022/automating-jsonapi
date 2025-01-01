import { test, expect } from '@playwright/test';


test.describe('/users API Endpoint Tests', () => {
    test('should return all users', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users');

        // Verify status code is good
        expect(response.status()).toBe(200);

        // Verify response body is not empty
        const responseBody = await response.json();
        expect(responseBody.length).toBeGreaterThan(0)

        
    })
})