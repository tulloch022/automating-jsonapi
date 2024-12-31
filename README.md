
# **JSONPlaceholder API Test Suite**

### **Overview**
This project demonstrates automated API testing for [JSONPlaceholder](https://jsonplaceholder.typicode.com/) using [Playwright](https://playwright.dev/). It focuses on verifying API endpoints, testing query parameters, and ensuring data integrity.

This repository is a **work in progress**, serving as a hands-on portfolio project to showcase API testing skills and refine best practices.

---

### **Features Tested**
The following API endpoints have been implemented and are actively tested:
1. **/posts**
   - Retrieve all posts.
   - Filter posts by `userId`.
   - Limit results using `_limit`.
   - Sort posts by title using `_sort` and `_order`.

2. **/comments**
   - Retrieve all comments.
   - Filter comments by `postId`.

Additional endpoints and advanced scenarios are planned as part of the ongoing project development.

---

### **Current Capabilities**
- Type-safe interfaces for structured API responses.
- Tests for query parameters, filtering, and sorting.
- Reliable execution with Playwright's API testing capabilities.
- Structured and maintainable code for scalability.

---

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

---

### **Next Steps**
- Add tests for additional endpoints:
  - **/users**
  - **/albums**
  - **/photos**
  - **/todos**
- Implement edge case testing for invalid inputs.
- Set up CI/CD pipelines for automated testing and reporting.

---

### **Disclaimer**
This repository is under active development and may contain interim files or experimental implementations. For questions or feedback, feel free to reach out!
