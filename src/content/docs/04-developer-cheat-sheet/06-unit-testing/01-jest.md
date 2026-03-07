---
title: Jest - Unit Testing
---

## Test Doubles in Jest (When & Why to Use Them)

### Quick Decision Guide

Ask yourself:

| Situation | Use |
|------------|------|
| I just need to pass a parameter but it’s not used | Dummy |
| I want to return a fixed value | Stub |
| I want to check if a function was called | Spy |
| I want full control over behavior & verify calls | Mock |
| I want a lightweight working version (like in-memory data) | Fake |

---

## 1. Stub in Jest

A **Stub** replaces a function and returns a fixed value.

### Use it when:

- You don’t want real implementation to run  
- You only need a predictable return value  
- You want to control test behavior  

###  Common Syntax

```ts
const LMockFn = jest.fn().mockReturnValue("SUCCESS");
```

### Common Usecase

Your service reads the Test Run ID from:

```ts
Cypress.env("FETCHED_TEST_RUN")
```
In unit testing:

-   Cypress does NOT actually run
    
-   `Cypress.env()` does not exist
    
-   So the test will fail
    

You don’t want real Cypress. You just want it to return a fixed Test Run ID.

So you use a **Stub**.

```ts
(global as any).Cypress = {
	env: jest.fn().mockReturnValue("TR-001"),
};
const LId = Cypress.env("FETCHED_TEST_RUN");
expect(LId).toBe("TR-001");
```