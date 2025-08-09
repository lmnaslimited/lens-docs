---
title: Standardized Coding Practices for Developers and Reviewers
---
## 1. Looping Best Practices

- **Use `for` loops for definite iterations**: When you know the number of iterations beforehand, use a `for` loop. 
This is ideal when you’re working with ranges or collections.
  
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
    l_user_input = ''
    while l_user_input != 'yes':
        l_user_input = input('Do you want to continue? (yes/no): ')
```
**Avoid:**

Excessive nesting of loops: Try to avoid more than two levels of nesting in loops as it can make the code harder to understand and maintain.

- **Example of excessive nesting (Avoid):**

#### Too many nested loops can be hard to follow
```python
for la_i in range(5):
    for la_j in range(5):
        for la_k in range(5):
            print(la_i, la_j, la_k)
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

Use parameterized queries to avoid SQL injection. This helps ensure that user input 
does not interfere with the SQL query logic.

**Example:**
```sql
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

Limit query results when needed: If you expect a large number of results, limit the 
number returned to reduce memory usage and improve performance.

**Example:**

```sql
-- Limit results to the first 100 records
SELECT * FROM products LIMIT 100;
```

Optimize queries with EXPLAIN: Use the EXPLAIN statement to analyze the performance 
of your queries and identify potential inefficiencies.

**Example:**

    -- Check the performance of the query
    EXPLAIN SELECT * FROM orders WHERE order_date > '2025-01-01';

**Avoid:**

    Using SELECT * in queries: Specify the exact columns you need rather than 
    using SELECT *. This makes the query more efficient and clearer.

**Example:** (Avoid):

```sql
    SELECT * FROM users;  -- Avoid this, specify columns instead
```

## 3. Comments Best Practices
#### Best Practices:

    Write meaningful and concise comments: Focus on explaining why the code exists, 
    especially for complex logic, instead of repeating the obvious.

**Example:**

```sql
#### Calculate the total cost after tax. The tax rate is fixed at 0.1.
l_total_cost = cost * (1 + 0.1)
```

Comment on complex logic or algorithms: If you’re implementing a complex 
algorithm, explain the approach and why it’s necessary.

**Example:**

```py
#### Using binary search to find an element in a sorted list
def fn_binary_search_leftmost(i_sorted_list, i_key, i_search_key):
    ##### Prerequisite: The list must be sorted. Then perform binary search.
        low = 0
        high = len(i_sorted_list) - 1
        result = -1

        while low <= high:
            mid = (low + high) // 2
            mid_dict = i_sorted_list[mid]

            if mid_dict[i_key] < i_search_key:
                low = mid + 1
            elif mid_dict[i_key] > i_search_key:
                high = mid - 1
            else:
                result = mid
                high = mid - 1  # Move towards left for leftmost occurrence
        return result
```

Use TODO comments: Mark areas where future improvements, refactoring, or additional 
work is required.

**Example:**
```py
# TODO: Refactor this loop to improve performance when data grows
for l_item in la_large_data:
    fnProcess(l_item)
```
**Avoid:**

    Unnecessary comments: Avoid commenting every line of code, especially when the 
    operation is obvious.

**Example:** (Avoid):
```sql
    # Increment the counter by 1
    l_counter += 1  # This comment is unnecessary, as the code is self-explanatory.
```
## 4. Issue Tracker Guidelines
#### Best Practices:

    Provide clear, detailed issue descriptions: Include what the issue is, 
    how to reproduce it, and the expected versus actual results.

**Example:**

Bug: User unable to log in with valid credentials
Steps to reproduce:
1. Open the application
2. Enter username and password
3. Click on the login button
Expected result: User should be logged in successfully
Actual result: Login button becomes unresponsive

**Avoid:**

    Vague issue descriptions: Do not submit issues that are unclear or 
    lack enough detail for the team to reproduce and fix the problem.

**Example (Avoid):**

    Issue: Login doesn't work
    (This description does not help in reproducing or understanding the issue)

    Duplicate issues: Always check if a similar issue already exists before creating 
    a new one.

## 5. Additional Development Best Practices

Best Practices:

    Write modular and reusable code: Break your code into small functions or 
    classes that perform one task, making it easier to maintain and test.

**Example:**
```python
def fn_calculate_total_cost(i_cost, i_tax_rate):
    return i_cost * (1 + i_tax_rate)

def fn_print_invoice(i_total_cost):
    print(f'Total cost: ${i_total_cost}')
```

Use version control (e.g., Git): Follow a consistent branching model (e.g., Gitflow) 
to keep track of features, bugs, and releases.

Write tests for your code: Automated tests help ensure your code works as expected 
and can handle edge cases.

**Example:**
```py
    def fn_test_calculate_total_cost():
        assert fn_calculate_total_cost(100, 0.1) == 110
```
**Avoid:**

    Hardcoding values: Avoid embedding fixed values directly in your code. 
    Instead, use constants or configuration files.

    Example (Avoid):

#### Hardcoding the tax rate
```python
l_total_cost = l_cost * (1 + 0.15)  # Tax rate should not be hardcoded like this
```
---

# Processing Concept

## Cursor-Based Sequential Processing in Python

### What Is Cursor-Based Sequential Processing?
* Cursor-Based Sequential Processing is a method of walking through a dataset one record at a time using a pointer (cursor) that remembers your current position.
* Think of it like reading a list from top to bottom, keeping your finger on the current row, and only moving down when you’re done with that row’s work.

### When to Use It
* You need to process related datasets by a shared key (e.g., Sales Order ID).
* You want to keep processing order predictable — top to bottom.
* You want to merge or enrich data per record before moving to the next one.
* You want clean, isolated logic per record.

**Note** : This method is best if the data sources are sorted and has atleast one key common between them

### Common Usecase
Dataset 1 — Sales Orders (Jan)
| SO ID  | Customer   |
| ------ | ---------- |
| SO-001 | John Doe   |
| SO-002 | Jane Smith |

Dataset 2 — Sales Order Items
| SO ID  | Item Code | Amount |
| ------ | --------- | ------ |
| SO-001 | ITM-001   | 500    |
| SO-001 | ITM-002   | 700    |
| SO-002 | ITM-003   | 300    |

Dataset 3 — Sales Taxes and Charges
| SO ID  | Account Head | Rate |
| ------ | ------------ | ---- |
| SO-001 | VAT          | 5    |
| SO-001 | GST          | 10   |
| SO-002 | GST          | 7    |
| so=002 | VAT          | 8    |

Target Output
| SO ID  | Customer   | Item Code | VAT | GST |
| ------ | ---------- | --------- | ----| ----|
| SO-001 | John Doe   | ITM-001   | 5   | 10  |
| SO-002 | Jane Smith | ITM-003   | 8   | 7   |
