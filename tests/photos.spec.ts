import { test, expect } from '@playwright/test';


interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

test.describe('/photos API Endpoint Tests', () => {
    test('should return 100 photos', async ({ request }) => {
        const response = await request.get('/photos?_limit=100');

        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify structure of response
        const responseBody: Photo[] = await response.json();
        responseBody.forEach(photo => {
            expect(photo.albumId).toBeDefined();
            expect(photo.id).toBeDefined();
            expect(photo.title).toBeDefined();
            expect(photo.url).toBeDefined();
            expect(photo.thumbnailUrl).toBeDefined();
        })
    })
    test('should return a single photo', async ({ request }) => {
        const response = await request.get('/photos/1');

        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify single photo returned
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1)
    })
    test('should return a 404 status code', async ({ request }) => {
        const response = await request.get('/photos/9999');
        expect(response.status()).toBe(404);
    })
})