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
it("should log order processed", () => {
	// spy on log method
	const LSpy = jest.spyOn(console, "log");

	// call original function
	fnProcessOrder();

	expect(LSpy).toHaveBeenCalled();
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
it("should return user data", async () => {
	const LMockApi = jest.fn().mockResolvedValue({
		name: "Alice",
	});
	const LUser = await LMockApi();
	expect(LUser.name).toBe("Alice");
})
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
it("should return the mocked environment value", () => {
	const LMockEnv = jest.fn().mockReturnValue("TEST");
	const LEnv = LMockEnv();
	expect(LEnv).toBe("TEST");
})
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
it("should return different values for each call", () => {
	const LMockApi = jest
		.fn()
		.mockReturnValueOnce("PAGE_1_DATA")
		.mockReturnValueOnce("PAGE_2_DATA");

	expect(LMockApi()).toBe("PAGE_1_DATA");
	expect(LMockApi()).toBe("PAGE_2_DATA");
})
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
it("should return the correct test run status", () => {
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
})

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
it("should handle API failure", async () => {
	const LMockApi = jest.fn().mockRejectedValue(
		new Error("Server Error")
	);

	await expect(LMockApi()).rejects.toThrow("Server Error");
})
```

## 9. Jest - mockResolvedValue

**mockResolvedValue()** makes an async function return a resolved promise.

### Use it when:

- You are testing async functions  
- You want to simulate API success  
- You don’t want real API calls  

### Common Syntax

```ts
const LMockFn = jest.fn().mockResolvedValue({ data: "SUCCESS" });

```

### Common Usecase

```ts
const LFetchData = jest.fn().mockResolvedValue("OK");

await expect(LFetchData()).resolves.toBe("OK");

```

## 10. Jest - clearAllMocks vs resetAllMocks

### Use it when:

-   Cleaning test state  
-   Avoiding test interference
    

### Key Difference

| Function | Behavior |
|----------|----------|
| clearAllMocks | Clears only call history (keeps implementation) |
| resetAllMocks | Clears call history + removes mock implementation |
| restoreAllMocks | Restores original (real) implementation |


### Common Syntax

```ts
beforeEach(() => {
  jest.clearAllMocks();
});

```

## 11. Jest - toHaveBeenCalled

Checks if a function was called.

### Use it when:

-   Verifying execution    
-   Tracking function usage
    

### Common Syntax

```ts
expect(mockFn).toHaveBeenCalled();

```

### Common Usecase

```ts
mockFn();
expect(mockFn).toHaveBeenCalled();

```

## 12. Jest - toHaveBeenCalledWith

Checks function arguments.

### Use it when:

-   Validating inputs    
-   Ensuring correct parameters
    

### Common Syntax

```ts
expect(mockFn).toHaveBeenCalledWith("data");

```

### Common Usecase

```ts
mockFn("test");
expect(mockFn).toHaveBeenCalledWith("test");

```

## 13. Jest - async/await Testing

Testing async functions properly.

### Use it when:

-   Working with APIs  
-   Promises or async logic
    

### Common Syntax

```ts
test("async test", async () => {
  const LdData = await fetchData();
  expect(LdData).toBe("OK");
});

```

## 14. Jest - beforeEach / afterEach

Setup and cleanup logic.

### Use it when:

-   Reusing setup  
-   Avoiding repeated code
    

### Common Syntax

```ts
beforeEach(() => {
  jest.clearAllMocks();
});

```


## 15. Jest - Testing Error Handling

Ensure your code handles failures.

### Use it when:

-   API fails   
-   Invalid inputs  
-   Unexpected behavior
    

### Common Syntax

```ts
expect(() => fn()).toThrow();

```

### Common Usecase

```ts
expect(() => JSON.parse("invalid")).toThrow();

```
## 16. Jest - Testing Class Methods

Testing methods inside classes.

### Use it when:

-   Working with services   
-   Testing business logic
    

### Common Syntax

```ts
class Calc {
  add(a, b) {
    return a + b;
  }
}

```

### Common Usecase

```ts
const LdObj = new Calc();
expect(LdObj.add(2,3)).toBe(5);

```

## 17. Jest - mockResolvedValueOnce

**mockResolvedValueOnce()** returns different resolved values for async calls.

### Use it when:

-   Multiple API calls
    
-   Different responses needed
    

### Common Syntax

```ts
const LMockFn = jest
  .fn()
  .mockResolvedValueOnce("A")
  .mockResolvedValueOnce("B");

```


## 18. Jest - spyOn vs jest.fn

### Key Difference


| Feature | spyOn | jest.fn |
|--------|------|--------|
| Purpose | Wraps existing function | Creates new mock function |
| Real Implementation | Can call real implementation | No real implementation |


## 19. Jest - toHaveBeenCalledTimes

Checks how many times function was called.

### Use it when:

-   Verifying loops
    
-   Ensuring no extra calls
    

### Common Syntax

```ts
expect(mockFn).toHaveBeenCalledTimes(2);

```

## 20. Jest - toBe vs toEqual

### Key Difference

| Feature | toBe | toEqual |
|--------|------|--------|
| Comparison Type | Strict comparison (===) | Deep comparison (objects/arrays) |

## 21. Jest - Mocking Modules

Mock entire file/module.

### Use it when:

-   External dependency    
-   API/helper files
    

### Common Syntax

```ts
jest.mock("./apiService");

```


## 22. Jest - Partial Mocking

Mock only specific functions.

### Use it when:

-   Keep some real logic
    
-   Mock only one function
    

### Common Syntax

```ts
jest.spyOn(service, "getData").mockReturnValue("MOCK");

```

## 23. Jest - expect.any()

Matches any value of a type.

### Use it when:

-   Value is dynamic
    
-   Only type matters
    

### Common Syntax

```ts
expect(mockFn).toHaveBeenCalledWith(expect.any(String));

```

## 24. Jest - expect.objectContaining()

Checks partial object match.

### Use it when:

-   Large objects
    
-   Only some fields matter
    

### Common Syntax

```ts
expect(obj).toEqual(
  expect.objectContaining({
    id: 1
  })
);

```


## 25. Jest - Testing Promises (resolves/rejects)

Test promise results directly.

### Use it when:

-   Async validation  
-   Cleaner syntax
    

### Common Syntax

```ts
await expect(promise).resolves.toBe("OK");
await expect(promise).rejects.toThrow();

```
## 26. Jest - Testing Conditional Logic

Test different branches in code.

### Use it when:
- Code has if/else  
- Multiple outcomes possible  

### Common Syntax

```ts
if (status === "SUCCESS") return true;
else return false;

```

### Common Usecase

```ts
expect(checkStatus("SUCCESS")).toBe(true);
expect(checkStatus("FAIL")).toBe(false);

```
## 27. Jest - Testing Loops

Ensure loops execute correctly.

### Use it when:

-   Iterating arrays

-   Repeated logic
    

### Common Syntax

```ts
items.forEach(item => process(item));

```

### Common Usecase

```ts
expect(mockFn).toHaveBeenCalledTimes(items.length);

```

## 28. Jest - Testing Return Types

Validate type of output.

### Use it when:

-   Function output matters
    
-   Prevent unexpected types
    

### Common Syntax

```ts
expect(typeof result).toBe("string");

```


## 29. Jest - Testing Null / Undefined

Check edge cases.

### Use it when:

-   Optional values 
-   Missing data
    

### Common Syntax

```ts
expect(value).toBeNull();
expect(value).toBeUndefined();

```


## 30. Jest - Testing Boolean Results

Check true/false outputs.

### Use it when:

-   Validation functions
    
-   Flags
    

### Common Syntax

```ts
expect(result).toBeTruthy();
expect(result).toBeFalsy();

```


## 31. Jest - Testing Array Length

Verify array size.

### Use it when:

-   API returns list    
-   Filtering logic
    

### Common Syntax

```ts
expect(arr.length).toBe(3);

```


## 32. Jest - Testing Object Keys

Ensure object structure.

### Use it when:

-   API response validation
    
-   Schema checking
    

### Common Syntax

```ts
expect(obj).toHaveProperty("id");

```

## 33. Jest - Testing Default Values

Check fallback values.

### Use it when:

-   Undefined inputs    
-   Defaults applied
    

### Common Syntax

```ts
function getName(name = "Guest") {
  return name;
}
```

### Common Usecase

```ts
expect(getName()).toBe("Guest");
```
