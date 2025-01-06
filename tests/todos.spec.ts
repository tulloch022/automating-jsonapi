import { test, expect } from '@playwright/test';


interface Todo {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
}

test.describe('/todos API Endpoint Tests', () => {
    test('should return all todos for all users', async ({ request }) => {
        const response = await request.get('/todos');

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
        const response = await request.get('/todos/1');
        
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
    })
    test('should return a 404 status code', async ({ request }) => {
        const response = await request.get('/todos/999');
        expect(response.status()).toBe(404);
    })
    test('should create new todo with provided values', async ({ request }) => {
        const newTodo: Todo = {
            userId: 1,
            title: 'title',
            completed: true,
        }
        const response = await request.post('/todos', {
            data: newTodo,
        })

        // Verify response status is good
        expect(response.status()).toBe(201);

        // Verify structure of response body
        const responseBody: Todo = await response.json();
        expect(responseBody.userId).toBe(newTodo.userId);
        expect(responseBody.title).toBe(newTodo.title);
        expect(responseBody.completed).toBe(newTodo.completed);
        expect(responseBody.id).toBeDefined();
    })
})