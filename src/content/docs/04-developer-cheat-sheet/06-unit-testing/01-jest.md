---
title: Jest - Unit Testing
---

## 1. Test Doubles in Jest (When & Why to Use Them)

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

## 2. Stub in Jest

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

## 3. Spy in Jest

A **Spy** watches an existing function.

It lets you verify:

- If the function was called
- How many times it was called
- What parameters were passed

Unlike a Stub, the **real implementation still runs**.

---

### Use it when

- You want the real logic to execute
- You only want to verify behavior
- You want to check if a function was triggered
- **Note** Always restore spies after testing.

---

###  Common Syntax

```ts
const LSpy = jest.spyOn(ObjectName, "functionName");
```

### Common Usecase
You want to confirm a logging function is triggered when a service runs.

```ts
//Real function:
function fnProcessOrder() {
	console.log("Order processed");
}

// Test
test("should log order processed", () => {
	// spy on log method
	const LSpy = jest.spyOn(console, "log");

	// call original function
	fnProcessOrder();

	expect(LConsoleSpy).toHaveBeenCalled();
	expect(LSpy).toHaveBeenCalledTimes(1);
	expect(LSpy).toHaveBeenCalledWith("Order processed");
	LSpy.mockRestore(); // restore the spy
});
```
**Why Spy?**

- You want the real logic to execute
- But you want to observe behavior


## 4. Mock in Jest

A **Mock** completely replaces a dependency.

It allows you to:

- Control behavior
- Simulate responses
- Verify interactions

Mocks are commonly used for:

- API calls
- Database queries
- External services

---

### Use it when

- The dependency is expensive
- The dependency is unreliable
- The dependency should not run in tests

---

###  Common Syntax

```ts
const LMock = jest.fn();
```

### Common Usecase
Your service calls an external API to fetch user data.

```ts
//Real implementation:

async function fnGetUser() {
	return fetch("/api/user");
}
```
In tests you should not call real APIs.

So you replace it with a mock.

```ts
const LMockApi = jest.fn().mockResolvedValue({
	name: "Alice",
});
const LUser = await LMockApi();
expect(LUser.name).toBe("Alice");
```

## 5. Jest - mockReturnValue

**mockReturnValue()** makes a mock function always return the same predefined value whenever it is called.
It replaces the function’s real behavior with a fixed predictable response.

### Use it when:

- The function should always return the same value
- The real implementation is unnecessary for the test
- You want simple predictable behavior

###  Common Syntax

```ts
const LMockFn = jest.fn().mockReturnValue(Value);
```

### Common Usecase
Your application reads the current system environment.

```ts
//Real function:

function fnGetEnvironment() {
	return process.env.NODE_ENV;
}
```

In unit tests, you want to control the environment value.

```ts
//Test:

const LMockEnv = jest.fn().mockReturnValue("TEST");
const LEnv = LMockEnv();
expect(LEnv).toBe("TEST");
```

**Why:**

- Real environment values may vary
- Tests must remain deterministic
- **mockReturnValue()** guarantees the function always returns the expected value

## 6. Jest - mockReturnValueOnce

**mockReturnValueOnce()** makes a mock function return different values for specific calls.
Each call consumes one defined return value.

### Use it When:
- A function is called multiple times
- Each call should return different data
- You want to simulate step-by-step behavior

### Common Syntax
```ts
const LMockFn = jest
	.fn()
	.mockReturnValueOnce(Value1)
	.mockReturnValueOnce(Value2);
```

### Common Usecase
Your service fetches paginated API data.

- First call → Page 1
- Second call → Page 2

```ts
const LMockApi = jest
	.fn()
	.mockReturnValueOnce("PAGE_1_DATA")
	.mockReturnValueOnce("PAGE_2_DATA");

expect(LMockApi()).toBe("PAGE_1_DATA");
expect(LMockApi()).toBe("PAGE_2_DATA");
```

## 7. Jest - mockImplementation
**mockImplementation()** replaces the function with a custom implementation.
Instead of returning a fixed value, you define how the function behaves.

### Use it When:
- You need custom logic
- The function’s output depends on input parameters
- A simple fixed return value is not sufficient

### Common Syntax
```ts
const LMockFn = jest.fn().mockImplementation((params) => {
	// custom logic
});
```

### Common Usecase
A service fetches Test Run details using a Test Run ID.

```ts
const LMockGetTestRun = jest.fn().mockImplementation((ITestRunId) => {
  if (ITestRunId === "TR-001") {
    return {
      name: "TR-001",
      status: "PASS",
    };
  }

  if (ITestRunId === "TR-002") {
    return {
      name: "TR-002",
      status: "FAIL",
    };
  }

  return null;
});

const LdTestRun = LMockGetRunLog("TR-002");
expect(LdTestRun.status).toBe("FAIL");

```

## 8. Jest - mockRejectedValue
**mockRejectedValue()** makes a mock function return a rejected Promise, simulating an error in an asynchronous operation.

### Use it When:
- Testing error handling
- Simulating API failures
- Simulating network errors

### Common Syntax
```ts
const LMockFn = jest.fn().mockRejectedValue(Error);
```

### Common Usecase
Your service fetches user data from an external API.
You want to test how your application handles API failure.

```ts
const LMockApi = jest.fn().mockRejectedValue(
	new Error("Server Error")
);

await expect(LMockApi()).rejects.toThrow("Server Error");
```