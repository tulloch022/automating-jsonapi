import { test, expect } from '@playwright/test';


interface Album {
    userId: number;
    id?: number;
    title: string;
}


test.describe('/albums API Endpoint Tests', () => {
    test('should return all albums for all users', async ({ request }) => {
        const response = await request.get('/albums');

        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify structure and that 100 albums are returned
        const responseBody: Album[] = await response.json();
        responseBody.forEach(album => {
            expect(album.userId).toBeDefined();
            expect(album.id).toBeDefined();
            expect(album.title).toBeDefined();
        })
        expect(responseBody.length).toBe(100);
    })
    test('should return a single album', async ({ request }) => {
        const response = await request.get('/albums/1');

        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify structure and that id is 1
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
    })
    test('should return status code 404', async ({ request }) => {
        const response = await request.get('/albums/999');
        expect(response.status()).toBe(404)
    })
    test('should create a new ablum with the provided data', async ({ request }) => {
        const newAlbum: Album = {
            userId: 3,
            title: 'album name',
        }
        const response = await request.post('/albums', {
            data: newAlbum,
        })

        // Verify response status is good
        expect(response.status()).toBe(201);

        // Verify structure of response
        const responseBody: Album = await response.json();
        expect(responseBody.userId).toBe(newAlbum.userId);
        expect(responseBody.title).toBe(newAlbum.title);
    })
})