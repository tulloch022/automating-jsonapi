import { test, expect } from '@playwright/test';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const validatePostStructure = (post: Post) => {
    expect(post.userId).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBeDefined();
    expect(post.body).toBeDefined();
}

test.describe('/posts API Endpoint Tests', () => {
    test('should return all posts for all users', async ({ request }) => {
        const response = await request.get('/posts');
    
        // Verify status code is good
        expect(response.status()).toBe(200);
    
        // Verify response body is not empty
        const responseBody: Post[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    
        responseBody.forEach(validatePostStructure)
    });
    
    
    test('should return posts for userId=1', async ({ request}) => {
        const response = await request.get('/posts?userId=1');
    
        // Verify status code is good
        expect(response.status()).toBe(200);
    
        // Verify response body is not empty
        const responseBody: Post[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    
        // Verify only posts from user 1 are returned
        
        responseBody.forEach((post) => {
            expect(post.userId).toBe(1);
        })
    })

    test('should return exactly 5 posts', async ({ request }) => {
        const response = await request.get('/posts?_limit=5');

        // Verify status code is good
        expect(response.status()).toBe(200);

        // Verify exactly 5 posts are returned
        const responseBody: Post[] = await response.json();
        expect(responseBody.length).toBe(5);
    })

    test('should return posts in ascending order', async ({ request }) => {
        const response = await request.get('/posts?_sort=title&_order=asc');

        // Verify status code is good
        expect(response.status()).toBe(200);

        // Sort the titles ascendingly programatically
        const responseBody: Post[] = await response.json();
        const actualTitles = responseBody.map(post => post.title);

        const sortedTitles = [...actualTitles].sort()
        
        expect(actualTitles).toEqual(sortedTitles)
    })
    test('should return all posts with no limit', async ({ request }) => {
        // Provide invalid query parameter
        const response = await request.get('/posts?_limits=5');

        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify no limit was applied and all posts returned
        const responseBody: Post[] = await response.json();
        expect(responseBody.length).toBe(100);

        // Verify structure of response
        responseBody.forEach(validatePostStructure)
    })
});