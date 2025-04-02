---
title: Standardized Coding Practices for Developers and Reviewers
---
## 1. Looping Best Practices

- **Use `for` loops for definite iterations**: When you know the number of iterations beforehand, use a `for` loop. This is ideal when you’re working with ranges or collections.
  
**Example:**
  ```python
  # Loop through a list of numbers
  la_numbers = [1, 2, 3, 4, 5]
  for l_number in la_numbers:
      frappe.msgprint((number))
 ```
   
- **Use while loops for indefinite iterations**: If the loop continues until a certain condition is met, use a while loop.
  
**Example:**
    ```python
    # Keep asking for user input until a valid response is given
    user_input = ''
    while user_input != 'yes':
        user_input = input('Do you want to continue? (yes/no): ')
    ```
**Avoid:**

Excessive nesting of loops: Try to avoid more than two levels of nesting in loops as it can make the code harder to understand and maintain.

- **Example of excessive nesting (Avoid):**

#### Too many nested loops can be hard to follow
```python
for i in range(5):
    for j in range(5):
        for k in range(5):
            print(i, j, k)
```
Using while True or similar without a clear way to exit the loop can result in the program hanging.

- **Example of an infinite loop (Avoid):**

#### Infinite loop without exit condition
``` py
while True:
    print("This will run forever unless manually stopped.")
```

## 2. Select (Query) Guidelines

#### Best Practices:

Use parameterized queries to avoid SQL injection. This helps ensure that user input does not interfere with the SQL query logic.

**Example:**
```sql
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

Limit query results when needed: If you expect a large number of results, limit the number returned to reduce memory usage and improve performance.

**Example:**

```sql
-- Limit results to the first 100 records
SELECT * FROM products LIMIT 100;
```

Optimize queries with EXPLAIN: Use the EXPLAIN statement to analyze the performance of your queries and identify potential inefficiencies.

**Example:**

    -- Check the performance of the query
    EXPLAIN SELECT * FROM orders WHERE order_date > '2025-01-01';

**Avoid:**

    Using SELECT * in queries: Specify the exact columns you need rather than using SELECT *. This makes the query more efficient and clearer.

**Example:** (Avoid):

```sql
    SELECT * FROM users;  -- Avoid this, specify columns instead
```

## 3. Comments Best Practices
#### Best Practices:

    Write meaningful and concise comments: Focus on explaining why the code exists, especially for complex logic, instead of repeating the obvious.

**Example:**

#### Calculate the total cost after tax. The tax rate is fixed at 0.1.
l_total_cost = cost * (1 + 0.1)

Comment on complex logic or algorithms: If you’re implementing a complex algorithm, explain the approach and why it’s necessary.

**Example:**

#### Using binary search to find an element in a sorted list
left, right = 0, len(sorted_list) - 1
while left <= right:
    mid = (left + right) // 2
    if sorted_list[mid] == target:
        return mid
    elif sorted_list[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

Use TODO comments: Mark areas where future improvements, refactoring, or additional work is required.

**Example:**

    # TODO: Refactor this loop to improve performance when data grows
    for item in large_data:
        process(item)

**Avoid:**

    Unnecessary comments: Avoid commenting every line of code, especially when the operation is obvious.

**Example:** (Avoid):
```sql
    # Increment the counter by 1
    counter += 1  # This comment is unnecessary, as the code is self-explanatory.
```
## 4. Issue Tracker Guidelines
#### Best Practices:

    Provide clear, detailed issue descriptions: Include what the issue is, how to reproduce it, and the expected versus actual results.

**Example:**

Bug: User unable to log in with valid credentials
Steps to reproduce:
1. Open the application
2. Enter username and password
3. Click on the login button
Expected result: User should be logged in successfully
Actual result: Login button becomes unresponsive

**Avoid:**

    Vague issue descriptions: Do not submit issues that are unclear or lack enough detail for the team to reproduce and fix the problem.

**Example (Avoid):**

    Issue: Login doesn't work
    (This description does not help in reproducing or understanding the issue)

    Duplicate issues: Always check if a similar issue already exists before creating a new one.

## 5. Additional Development Best Practices

Best Practices:

    Write modular and reusable code: Break your code into small functions or classes that perform one task, making it easier to maintain and test.

**Example:**
```python
def calculate_total_cost(cost, tax_rate):
    return cost * (1 + tax_rate)

def print_invoice(total_cost):
    print(f'Total cost: ${total_cost}')
```

Use version control (e.g., Git): Follow a consistent branching model (e.g., Gitflow) to keep track of features, bugs, and releases.

Write tests for your code: Automated tests help ensure your code works as expected and can handle edge cases.

**Example:**
```py
    def test_calculate_total_cost():
        assert calculate_total_cost(100, 0.1) == 110
```
**Avoid:**

    Hardcoding values: Avoid embedding fixed values directly in your code. Instead, use constants or configuration files.

    Example (Avoid):

#### Hardcoding the tax rate
```python
total_cost = cost * (1 + 0.15)  # Tax rate should not be hardcoded like this
```