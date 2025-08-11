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

## Parallel cursor Processing in Python

### What Is Parallel cursor Processing?
* Parallel cursor processing is a performance optimization technique used to process multiple related datasets without repeatedly scanning them from the start.
* It works by keeping pointers (cursors) in each dataset, starting the next search from the last matched position instead of restarting from the first record.
* This is especially efficient when datasets are sorted by the same key and need to be processed sequentially.
### When to Use It
* Processing parent–child or multi-level related records.
* All datasets are sorted on the join key (e.g., parent or name).
* You need to merge/enrich data efficiently without restarting loops.

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
| SO-001 | John Doe   | ITM-002   | 5   | 10  |
| SO-002 | Jane Smith | ITM-003   | 8   | 7   |

### Wrong Way (Nested Loops — Slow)
```python
la_sales_orders = frappe.get_all("Sales Order",
    filters={"transaction_date": ["between", ["2025-08-01", "2026-03-01"]]},
    fields=["name", "customer", "transaction_date"]
)
la_sales_order_names = [ld_so["name"] for ld_so in la_sales_orders]

la_items = frappe.get_all("Sales Order Item",
    filters={"parent": ["in", la_sales_order_names]},
    fields=["parent", "item_code", "amount"]
)

la_taxes = frappe.get_all("Sales Taxes and Charges",
    filters={"parent": ["in", la_sales_order_names]},
    fields=["parent", "account_head", "rate"]
)

l_before_time=frappe.utils.now_datetime()
print(l_before_time)
la_final=[]

for ld_so in la_sales_orders:
    ld_final={}
    ld_final["customer"]=ld_so.customer
    ld_final["sales_order"]=ld_so.name

    for ld_soi in la_items:
        if ld_so.name == ld_soi.parent:
            ld_final["item_code"]=ld_soi.item_code
            for ld_sot in la_taxes:
               if ld_so.name == ld_sot.parent: 
                   ld_final[ld_sot.account_head]=ld_soi.amount*ld_sot.rate/100
            la_final.append(ld_final)

print(la_final)

l_after_time=frappe.utils.now_datetime()
print("After Time",l_after_time)
print(l_after_time-l_before_time)
```

**Problem:** Each loop starts from the beginning — scans same data multiple times.

### Right Way (Parallel Cursor — Fast)
```python
la_sales_orders = frappe.get_all("Sales Order",
    filters={"transaction_date": ["between", ["2025-08-01", "2026-03-01"]]},
    fields=["name", "customer", "transaction_date"],
    order_by='name'   
     )

la_sales_order_names = [ld_so["name"] for ld_so in la_sales_orders]
log("Parent SO Names:\n" + str(la_sales_orders_names))

la_items = frappe.get_all("Sales Order Item",
    filters={"parent": ["in", la_sales_order_names]},
    fields=["parent", "item_code", "amount"],
    order_by='parent'
)
la_taxes = frappe.get_all("Sales Taxes and Charges",
    filters={"parent": ["in", la_sales_order_names]},
    fields=["parent", "account_head", "rate"],
    order_by='parent'
)

l_before_time=frappe.utils.now_datetime()
print(l_before_time)
la_final=[]

l_so_item_cursor=0
l_so_tax_cursor=0
l_counter=0
for ld_so in la_sales_orders:
    ld_final={}
    ld_final["customer"]=ld_so.customer
    ld_final["sales_order"]=ld_so.name
    for iIdx,ld_soi in enumerate(la_items[l_so_item_cursor:], start=l_so_item_cursor):
        l_so_item_cursor = iIdx
        if ld_so.name != ld_soi.parent:
            ld_final["item_code"]=ld_soi.item_code
            break
        for iIndex,ld_sot in enumerate(la_taxes[l_so_tax_cursor:], start=l_so_tax_cursor):
            l_counter=l_counter+1
            l_so_tax_cursor = iIndex
            if ld_so.name != ld_sot.parent: 
                break
            ld_final[ld_sot.account_head]=ld_soi.amount*ld_sot.rate/100
        la_final.append(ld_final)

print(la_final)

l_after_time=frappe.utils.now_datetime()
print("After Time",l_after_time)
print(l_after_time-l_before_time)

```
**How This Works**
* All datasets are sorted by the same key (name for parent, parent for child tables).
* item_cursor moves forward through Sales Order Items without going back.
* tax_cursor moves forward through Taxes without going back.
* For each SO, items and taxes are processed only once.