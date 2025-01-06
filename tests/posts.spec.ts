import { test, expect } from '@playwright/test';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const validatePostStructure = (post: Post) => {
    expect(post.userId, 'Post is missing userId').toBeDefined();
    expect(post.id ,'Post is missing id').toBeDefined();
    expect(post.title, 'Post is missing title').toBeDefined();
    expect(post.body, 'Post is missing body').toBeDefined();
}

test.describe('/posts API Endpoint Tests', () => {
    test('should return all posts for all users', async ({ request }) => {
        const response = await request.get('/posts');
    
        // Verify status code is good
        expect(response.status(), 'Expected status code 200 for /posts').toBe(200);
    
        // Verify response body is not empty
        const responseBody: Post[] = await response.json();
        expect(responseBody.length, 'Expected response to not be empty').toBeGreaterThan(0);
    
        responseBody.forEach(validatePostStructure)
    });
    
    
    test('should return posts for userId=1', async ({ request}) => {
        const response = await request.get('/posts?userId=1');
    
        // Verify status code is good
        expect(response.status(), 'Expected status code 200 for /posts?userId=1').toBe(200);
    
        // Verify response body is not empty
        const responseBody: Post[] = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    
        // Verify only posts from user 1 are returned
        
        responseBody.forEach((post) => {
            expect(post.userId, 'Expected user ID to be 1').toBe(1);
        })
    })

    test('should return exactly 5 posts', async ({ request }) => {
        const response = await request.get('/posts?_limit=5');

        // Verify status code is good
        expect(response.status(), 'Expected status code to 200 for /posts?_limit=5').toBe(200);

        // Verify exactly 5 posts are returned
        const responseBody: Post[] = await response.json();
        expect(responseBody.length, 'Expected exactly 5 posts to returned').toBe(5);
    })

    test('should return posts in ascending order', async ({ request }) => {
        const response = await request.get('/posts?_sort=title&_order=asc');

        // Verify status code is good
        expect(response.status(), 'Expected status code to be 200 for /posts?_sort=title&_order=asc').toBe(200);

        // Sort the titles ascendingly programatically
        const responseBody: Post[] = await response.json();
        const actualTitles = responseBody.map(post => post.title);

        const sortedTitles = [...actualTitles].sort()
        
        expect(actualTitles, 'Expected posts to be sorted in ascending order').toEqual(sortedTitles)
    })
    test('should return all posts with no limit', async ({ request }) => {
        // Provide invalid query parameter
        const response = await request.get('/posts?_limits=5');

        // Verify response status is good
        expect(response.status(), 'Expected status code to be 200 for invalid query parameter').toBe(200);

        // Verify no limit was applied and all posts returned
        const responseBody: Post[] = await response.json();
        expect(responseBody.length, 'Expected all 100 posts to be returned for invalid query parameter').toBe(100);

        // Verify structure of response
        responseBody.forEach(validatePostStructure)
    })
    test('should return 0 results', async ({ request }) => {
        const response = await request.get('/posts?userId=999');

        // Verify status of response is good
        expect(response.status(), 'Expected status code to be 200 for userId=999').toBe(200);
        
        // Verify response is empty
        const responseBody = await response.json();
        expect(responseBody.length, 'Expected response to be empty').toBe(0);
    })
    test('should create new post with provided values', async ({ request }) => {
        const newPost = {
                "title": "foo",
                "body": "bar",
                "userId": 1
        }
        const response = await request.post('/posts', {
            data: newPost})

        // Verify status code is created
        expect(response.status(), 'Expected status code to be 201').toBe(201);

        // Verify response body structure
        const responseBody = await response.json();
        expect(responseBody.title).toBe(newPost.title);
        expect(responseBody.body).toBe(newPost.body);
        expect(responseBody.userId).toBe(newPost.userId);
        expect(responseBody.id).toBeDefined();
    })
    test('should update existing post with provided values', async ({ request }) => {
        const updatedPost = {
            id: 1,
            title: "bar",
            body: "foo",
            userId: 1
        }

        const response = await request.put('/posts/1', {
            data: updatedPost
        })

        // Verify response status is good
        expect(response.status()).toBe(200)

        // Verify structure of response
        const responseBody: Post = await response.json();
        expect(responseBody.id).toBe(updatedPost.id);
        expect(responseBody.title).toBe(updatedPost.title);
        expect(responseBody.body).toBe(updatedPost.body);
        expect(responseBody.userId).toBe(updatedPost.userId);
    })
    test('should update partial existing post with provided values', async ({ request }) => {
        const partialUpdatedPost = {
            body: "updated Body"
        }
        const response = await request.patch('/posts/1', {
            data: partialUpdatedPost
        })
        // Verify response status is good
        expect(response.status()).toBe(200);

        // Verify structure of response
        const responseBody: Post = await response.json();
        expect(responseBody.body).toBe("updated Body");
        validatePostStructure(responseBody);
    })
    test('should remove specified post', async ({ request }) => {
        const response = await request.delete('/posts/1');
        // Verify response status is good
        expect(response.status()).toBe(200);
    })
});