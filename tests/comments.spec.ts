import { test, expect } from '@playwright/test';

interface Comment {
    postId: number,
    id?: number,
    name: string,
    email: string,
    body: string
}

const validateCommentStructure = (comment: Comment) => {
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
        expect(response.status(), 'Expected status code to be 200 for /comments').toBe(200);
    
        // Verify response is not empty
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected response to not be empty').toBeGreaterThan(0);
    
        // Verify structure of each comment
        responseBody.forEach(validateCommentStructure)
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
    test('should return an empty response for non-existent postId', async ({ request }) => {
        const response = await request.get('/comments?postId=500');

        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for non-existent postId').toBe(200);

        // Verify response is empty
        const responseBody = await response.json();
        expect(responseBody.length, 'Expected empty response for non-existent postId').toBe(0);
    })
    test('should handle invalid query parameters gracefully', async ({ request }) => {
        const response = await request.get('/comments?invalidParam=xyz');
    
        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for invalid query parameter').toBe(200);
    
        // Verify all comments are returned
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected all comments to be returned for invalid query parameter').toBeGreaterThan(0);

         // Verify structure of each comment
         responseBody.forEach(validateCommentStructure);
    });
    test('should return 5 comments when _limit is specified', async ({ request }) => {
        const response = await request.get('/comments?_limit=5');
    
        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for /comments?_limit=5').toBe(200);
    
        // Verify exactly 5 comments are returned
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected exactly 5 comments to be returned').toBe(5);
    
        // Verify structure of each comment
        responseBody.forEach(validateCommentStructure);
    });
    test('should skip comments based on _start parameter', async ({ request }) => {
        const response = await request.get('/comments?_start=5&_limit=5');

        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for /comments?_start=5&_limit=5').toBe(200);

        // Verify exactly 5 comments are returned
        const responseBody: Comment[] = await response.json();
        expect(responseBody.length, 'Expected exactly 5 comments to be returned after skipping 5').toBe(5);

        // Verify structure of each comment
        responseBody.forEach(validateCommentStructure);
    });
    test('should create a new comment with provided data', async ({ request }) => {
        const newComment: Comment = {
            postId: 3,
            name: 'kevin',
            email: 'kevin@kevincom',
            body: 'this is a comment'
        }
        const response = await request.post('/comments', {
            data: newComment,
        })

        // Verify response status is good
        expect(response.status()).toBe(201);

        // Verify structure of response.
        const responseBody: Comment = await response.json();
        expect(responseBody.postId).toBe(newComment.postId);
        expect(responseBody.name).toBe(newComment.name);
        expect(responseBody.email).toBe(newComment.email);
        expect(responseBody.body).toBe(newComment.body);
        expect(responseBody.id).toBeDefined();
    })
})