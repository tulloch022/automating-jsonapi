import { test, expect } from '@playwright/test';

interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const validateCommentStucture = (comment: Comment) => {
    expect(comment.postId, 'Comment is missing postId').toBeDefined();
    expect(comment.id, 'Comment is missing id').toBeDefined();
    expect(comment.name, 'Comment is missing name').toBeDefined();
    expect(comment.email, 'Comment is missing email').toBeDefined();
    expect(comment.body, 'Comment is missing body').toBeDefined();
}

test.describe('/comments API Endpoint Test', () => {
    test('should return all comments for all posts', async ({ request }) => {
        const response = await request.get('/comments');
    
        // Verify status code is good
        expect(response.status(), 'Expected status code to be 2-- for /comments').toBe(200);
    
        // Verify response is not empty
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected response to not be empty').toBeGreaterThan(0);
    
        // Verify structure of each comment
        responseBody.forEach(validateCommentStucture)
    })
    
    test('should return comments for postId=2', async ({ request }) => {
        const response = await request.get('/comments?postId=2')
    
         // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for /comments?postId=2').toBe(200);
        
        // Verify response is not empty
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected response to not be empty').toBeGreaterThan(0);
    
        // Verify all comments are from postId=2
        responseBody.forEach(comment => {
            expect(comment.postId, 'Expected postId to be 2 for all comments').toBe(2);
        })
    })
    test('should return 0 comments', async ({ request }) => {
        const response = await request.get('/comments?postId=500');

        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for non-existant postId').toBe(200);

        // Verify response is empty
        const responseBody = await response.json();
        expect(responseBody.length, 'Expected empty repsonse for non-existant postId').toBe(0);
    })
})