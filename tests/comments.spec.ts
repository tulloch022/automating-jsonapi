import { test, expect } from '@playwright/test';

interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

test.describe('/comments API Endpoint Test', () => {
    test('should return all comments for all posts', async ({ request }) => {
        const response = await request.get('/comments');
    
        // Verify status code is good
        expect(response.status()).toBe(200);
    
        // Verify response is not empty
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    
        // Verify structure of each comment
        responseBody.forEach(comment => {
            expect(comment.postId).toBeDefined();
            expect(comment.id).toBeDefined();
            expect(comment.name).toBeDefined();
            expect(comment.email).toBeDefined();
            expect(comment.body).toBeDefined();
        })
    })
    
    test('should return comments for postId=2', async ({ request }) => {
        const response = await request.get('/comments?postId=2')
    
         // Verify status code is good
        expect(response.status()).toBe(200);
        
        // Verify response is not empty
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    
        // Verify all comments are from postId=2
        responseBody.forEach(comment => {
            expect(comment.postId).toBe(2);
        })
    });
    
})