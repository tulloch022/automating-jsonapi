# JSONPlaceholder API Test Suite

## Overview
This repository contains comprehensive API test suites for the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), designed to validate the functionality, reliability, and integrity of all supported endpoints.

## Key Features
- **Full CRUD Coverage**: Includes `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` operations across all applicable endpoints.
- **Comprehensive Testing**:
  - Validates response structure and status codes.
  - Handles edge cases, including non-existent resources and invalid query parameters.
- **Reusable Validation Functions**: Implements modular helper functions for consistency and maintainability.
- **Production-Ready**: Designed with professional standards, ready for integration into CI/CD pipelines.

## Endpoints Tested
| Endpoint       | Methods Implemented                  | Status       |
|----------------|--------------------------------------|--------------|
| `/posts`       | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | ✅ Completed |
| `/comments`    | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | ✅ Completed |
| `/albums`      | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | ✅ Completed |
| `/photos`      | `GET`                                 | ✅ Completed |
| `/todos`       | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | ✅ Completed |
| `/users`       | `GET`, `PUT`, `PATCH`                 | ✅ Completed |

## Technologies Used
- **Playwright**: Modern testing framework for reliable API tests.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **Node.js**: Core runtime environment for executing tests.

### **How to Run the Tests**
1. Clone the repository:
   ```bash
   git clone https://github.com/tulloch022/automating-jsonapi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd automating-jsonapi
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run all tests:
   ```bash
   npx playwright test
   ```
