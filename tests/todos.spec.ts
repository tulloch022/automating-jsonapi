import { test, expect } from '@playwright/test';


interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

test.describe('/todos API Endpoint Tests', () => {
    test('should return all todos for all users', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/todos');

        // Verify status code is good
        expect(response.status()).toBe(200);

        // Verify response structure
       const responseBody: Todo[] = await response.json();
       responseBody.forEach(todo => {
        expect(todo.userId).toBeDefined();
        expect(todo.id).toBeDefined();
        expect(todo.title).toBeDefined();
        expect(todo.completed).toBeDefined();
       })

       // Verify 200 todos are returned
       expect(responseBody.length).toEqual(200);
    })
    test('should return a single todo with id of 1', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
        
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
    })
    test('should return a 404 status code', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/todos/999');
        expect(response.status()).toBe(404);
    })
})