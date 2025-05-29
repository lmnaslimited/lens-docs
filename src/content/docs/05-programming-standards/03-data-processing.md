---
title: Programming Standards - Data Processing
---
## Defining Output Data

- Use same structure & naming conventions across all fields  (e.g., `fieldname`, `label`, `fieldtype`, `width`). 
- Use meaningful `fieldname`s and clear, user-friendly `label`s.
-  Avoid abbreviations or vague names—this makes reports easier to understand and maintain.
- Include metadata like `fieldtype` and `options` for accurate rendering and linking. 
- Use `_()` for labels to support multilingual interfaces, and `<br>` for better visual formatting where needed.

**❌ Incorrect Way: Poorly Defined Output**
```python
columns = [
    {"name": "SO No", "width": 120},
    {"label": "Customer Name"},
    {"fieldname": "itemcode", "type": "text"},
    {"fieldname": "qty"},
    {"label": "Invoice#", "fieldtype": "data"},
    {"fieldname": "PO Date", "fieldtype": "date"}
]
```
**Wrong Practice:**

-   Inconsistent key names (`name`, `label`, `fieldname` used interchangeably)
-   Missing required keys like `fieldtype` or `width`
-   No clarity on `options` for `Link` fields
-   Label format inconsistent (e.g., `"Invoice#"` instead of `"Invoice Number"`)
-   Lacks localization or HTML formatting where needed


**✅ Correct Way: Well-Defined and Structured Output**
```python
la_columns = [
    {"fieldname": "sales_order", "label": _("Sales Order"), "fieldtype": "Link", "options": "Sales Order", "width": 140},
    {"fieldname": "customer_name", "label": _("Customer Name"), "fieldtype": "Link", "options": "Customer", "width": 180},
    {"fieldname": "delivery_date", "label": _("Delivery Date"), "fieldtype": "Date", "width": 120},
    {"fieldname": "item_code", "label": _("Item Code"), "fieldtype": "Link", "options": "Item", "width": 160},
    {"fieldname": "order_value", "label": _("Order Value"), "fieldtype": "Currency", "width": 120},
    {"fieldname": "po_date", "label": _("PO Date"), "fieldtype": "Date", "width": 100},
]
```
**Best Practices Applied:**
-   All fields use consistent and complete keys: `fieldname`, `label`, `fieldtype`, `width`
-   Proper localization using `_()` for labels
-   Follows consistent naming (`snake_case`)
-   `fieldtype` properly declared (`Link`, `Float`, `Date`, etc.
-   `options` included for all `Link` fields
-   Labels are UI-friendly with `<br>` formatting where applicable.

**Sample Output:**
| Sales Order        | Customer Name   | Delivery Date | Item Code               | Order Value | PO Date    |
| ------------------ | --------------- | ------------- | ----------------------- | ----------- | ---------- |
| SAL-ORD-2025-00001 | ABB AG  | 15-06-2025    | DTTHZ2/800/10/28/400/75 | 12.500,00 | 20-05-2025 |
| SAL-ORD-2025-00002 | John | 01-07-2025    | DTTHZ3/630/20/22/450/85 | 9.800,00  | 25-05-2025 |

---

## Initialization and Clearing fields

When building structured data from complex objects like sales orders and their line items **initializing and clearing fields at the start of processing each item is critical** for the following reasons:
-   It **ensures each data entry starts from a clean state**, avoiding leftover values from previous iterations. 
-   Makes the data **consistent and reliable**, which is especially important when some fields are optional or conditionally filled.

**Scenario:**  
When processing a sales order with multiple items, not every item will have all fields filled. Initializing each item’s data structure beforehand ensures all expected fields exist, avoids leftover data from previous items, and keeps the output consistent and reliable.

**❌ Incorrect Way**
```python
la_data
for ld_sales_order in la_sales_order:
	ld_row = {}  # Only declared once, outside the loop
	for ld_item in ld_sales_order.items:
	    ld_row["sales_order"] = ld_sales_order.name
	    ld_row["customer_nmae"] = ld_sales_order.customer_name
	    ld_row["delivery_date"] = ld_item.delivery_date
	    ld_row["item_code"] = ld_item.item_code
	    ld_row["order_value"] = ld_item.order_value
	    ld_row["po_date"] = ld_sales_order.po_date

	    la_data.append(ld_row)  # Appends the same dictionary object every time

```
**WHY:**
-   Only **one dictionary** `row` is created.
-   Each iteration **overwrites the same object**.
-   `data` will contain **multiple references to the same final row**.
-   The output will look like this:




| Sales Order        | Customer Name | Delivery Date | Item Code               | Order Value | PO Date    |
| ------------------ | ------------- | ------------- | ----------------------- | ----------- | ---------- |
| SAL-ORD-2025-00002 | John          | 01-07-2025    | DTTHZ3/630/20/22/450/85 | 9.800,00    | 25-05-2025 |
| SAL-ORD-2025-00002 | John          | 01-07-2025    | DTTHZ3/630/20/22/450/85 | 9.800,00    | 25-05-2025 |

**✅ Correct Way**
```python	
la_data = []
for ld_sales_order in la_sales_order:
	for ld_item in ld_sales_order.items:
	    # Step 1: Initialize the row with empty/default values
        ld_row = {
            "sales_order": ld_sales_order.name, # from sales order header
            "customer_name": ld_sales_order.customer_name, # from sales order header
            "delivery_date": "",  
            "item_code": "", 
            "order_value": "", 
            "po_date": ld_sales_order.po_date # from sales order header
        }

        # Step 2: Assign actual values
        ld_row["delivery_date"] = ld_item.delivery_date
        ld_row["item_code"] = ld_item.item_code
        ld_row["order_value"] = ld_item.order_value
        # Step 3: Append the populated row to the data list
        la_data.append(ld_row)

```
**WHY**
-   **Step 1 (Initialization)** ensures that all fields are clean before data is assigned.
-   Prevents **carry-over bugs** from reused fields or dictionaries.
-   Makes the code **explicit and easier to maintain**, especially when fields are optional or filled conditionally.

| Sales Order        | Customer Name | Delivery Date | Item Code               | Order Value | PO Date    |
| ------------------ | ------------- | ------------- | ----------------------- | ----------- | ---------- |
| SAL-ORD-2025-00001 | ABB AG        | 15-06-2025    | DTTHZ2/800/10/28/400/75 | 12.500,00   | 20-05-2025 |
| SAL-ORD-2025-00002 | John          | 01-07-2025    | DTTHZ3/630/20/22/450/85 | 9.800,00    | 25-05-2025 |

---

## Binary Search: Find Leftmost Occurrence in a Sorted List

**Description**
- Used to find the **leftmost index** of a given key in a **sorted list of dictionaries**.
- Uses the **binary search algorithm** for efficient lookup (`O(log n)` complexity).
- Requires that the list is **pre-sorted by the specified key** (`i_key`).
- Returns the **index** of the first (leftmost) matching element, or `-1` if not found.
- Useful for handling **duplicates** where the earliest position is required.

**❌ Incorrect Way:**
```python
# Searching linearly or without ensuring sorting
for l_idx, ld_order in enumerate(sales_orders):
    if ld_order["customer_name"] == "ABB AG":
        return l_idx
```
**Why it's incorrect:**
- Inefficient for large datasets (O(n) time complexity).
- Doesn't guarantee the leftmost occurrence in all cases.
- Assumes value is directly accessible and data is sorted — not generic.

### ✅ Correct Way

```python
def fn_binary_search_leftmost(i_sorted_list, i_key, i_search_key):
    """
    Perform binary search to find the leftmost occurrence of a value in a sorted list of dictionaries.

    Parameters:
        i_sorted_list (list[dict]): Sorted list of dictionaries.
        i_key (str): Dictionary key to compare.
        i_search_key (Any): Value to search for.

    Returns:
        int: Leftmost index of the matching element, or -1 if not found.
    """
    l_low = 0
    l_high = len(i_sorted_list) - 1
    l_result = -1

    while l_low <= l_high:
        l_mid = (l_low + l_high) // 2
        ld_mid_dict = i_sorted_list[mid]

        if ld_mid_dict[i_key] < i_search_key:
            l_low = l_mid + 1
        elif ld_mid_dict[i_key] > i_search_key:
            l_high = l_mid - 1
        else:
            l_result = l_mid
            l_high = l_mid - 1  # Continue search on the left side
    return l_result
```

**Sample Input:**

```python
la_sales_orders = [
    {
        "sales_order": "SAL-ORD-2025-00001",
        "customer_name": "ABB AG",
        "delivery_date": "15-06-2025",
        "item_code": "DTTHZ2/800/10/28/400/75",
        "order_value": "12.500,00",
        "po_date": "20-05-2025"
    },
    {
        "sales_order": "SAL-ORD-2025-00002",
        "customer_name": "John",
        "delivery_date": "01-07-2025",
        "item_code": "DTTHZ3/630/20/22/450/85",
        "order_value": "9.800,00",
        "po_date": "25-05-2025"
    },
    {
        "sales_order": "SAL-ORD-2025-00003",
        "customer_name": "John",
        "delivery_date": "05-07-2025",
        "item_code": "DTTHZ3/630/20/22/450/90",
        "order_value": "10.200,00",
        "po_date": "26-05-2025"
    }
]
#`Make sure the list is sorted by 'customer_name'`
la_sales_orders.sort(key=lambda x: x["customer_name"])

l_index = fn_binary_search_leftmost(la_sales_orders, "customer_name", "John")
log(l_index)
```
**Sample Output**
```
1
```
**Explanation**
- The customer_name "John" appears twice.
- Binary search returns the leftmost index (1) of the first occurrence of "John" in the sorted list.
- Efficient and reliable even with thousands of orders.

---

## Getting Unique records

- When processing datasets, it's important to eliminate duplicates early — especially when you're working with values like customer names, item codes, or IDs.  
- Ensures uniqueness improves performance by avoiding redundant processing.

 **Scenario**
We have a `sales_order` dataset.  When we need to extract a list of **unique customers** (`customer_name`) from it.

**❌ Incorrect Way:**

```python
la_columns = [
    {"sales_order": "SAL-ORD-2025-00001", "customer_name": "ABB AG", "delivery_date": "15-06-2025", "item_code": "DTTHZ2/800/10/28/400/75", "order_value": "12.500,00", "po_date": "20-05-2025"},
    {"sales_order": "SAL-ORD-2025-00002", "customer_name": "John", "delivery_date": "01-07-2025", "item_code": "DTTHZ3/630/20/22/450/85", "order_value": "9.800,00", "po_date": "25-05-2025"},
    {"sales_order": "SAL-ORD-2025-00003", "customer_name": "ABB AG", "delivery_date": "20-07-2025", "item_code": "DTTHZ4/900/30/35/500/90", "order_value": "15.200,00", "po_date": "30-05-2025"},
]
# Wrong way: 
def fn_get_unique(id_data_set, i_key):
    la_unique = []
    for it_data in id_data_set:
        if i_key in it_data:
            l_value = it_data[i_key]
            if l_value not in la_unique:  # ❌ Slow linear search every time
                la_unique.append(l_value)
    return la_unique

la_unique_customers = fn_get_unique_inefficient(la_columns, "customer_name")
print(la_unique_customers)

```
**Sample Output:**
```py
['ABB AG', 'John'] 
```
**WHY**
Slower and consumes more CPU time as dataset grows.

**✅ Correct Way:**
 
 This  uses a `set` to collect only **unique** values.
 ```py
 def fn_get_unique(id_data_set, i_key):
    la_unique = list(set(it_data[i_key] for it_data in id_data_set if i_key in it_data))
    return la_unique
la_unique_customers = get_unique(la_columns, "customer")
print(la_unique_customers)  
 ```
 **Sample Output:**
```py
['ABB AG', 'John'] 
```
**WHY**
Fast, clean, and memory-efficient even for large datasets.

---

## Avoid Hitting Database Repeatedly During Data Processing

-   When processing data (e.g., extracting customer details), **do NOT query or loop over the database/dataset repeatedly** for the same data.
-   Instead, **fetch the dataset once** and then use techniques like extracting unique customers to work efficiently.
-   This avoids performance issues and redundant operations, especially when customers have multiple sales orders.

**Example**:
- We have a dataset called `la_columns`, which contains sales order records. Each record includes customer name, delivery date, item code, order value, and PO date. Some customers can have **multiple sales orders**.Now, say we want to **fetch customer details** (e.g., from a database). 

**❌ Incorrect Way: Query or Loop Repeatedly for Each Customer**

```python
la_columns = [
    {"sales_order": "SAL-ORD-2025-00001", "customer_name": "ABB AG", "delivery_date": "15-06-2025", "item_code": "DTTHZ2/800/10/28/400/75", "order_value": "12.500,00", "po_date": "20-05-2025"},
    {"sales_order": "SAL-ORD-2025-00002", "customer_name": "John", "delivery_date": "01-07-2025", "item_code": "DTTHZ3/630/20/22/450/85", "order_value": "9.800,00", "po_date": "25-05-2025"},
    {"sales_order": "SAL-ORD-2025-00003", "customer_name": "ABB AG", "delivery_date": "20-07-2025", "item_code": "DTTHZ4/900/30/35/500/90", "order_value": "15.200,00", "po_date": "30-05-2025"},
]

def fn_query_customer_details(ia_customer):
   return {
        "customer": ia_customer["name"],
        "customer_address": ia_customer["address"],
        "phone_number": ia_customer.["phone_number"]
    }
for ld_record in la_columns:
    la_details = fn_query_customer_details([ld_record["customer"]])
    print(la_details)
```
The **wrong way** queries customer details multiple times if the same customer appears many times.

✅ **Correct Way: Query Unique Customers Only Once**
```python
la_unique_customers = set(ld_record["customer"] for ld_record in la_columns)
for l_customer in la_unique_customers:
   la_details = fn_query_customer_details([l_customer])
```
The **correct way** extracts unique customers first and queries each customer only once — much more efficient!

---

## Count Sales Orders for a Single Customer

**Description**
- Counts how many sales orders exist for a specific customer.
- Useful for reporting, validation, and analytics.
- Works with a list of dictionaries, each representing a sales order.
- Ensures accuracy even when multiple customers are present.
- Uses a memory-efficient single-pass approach.

 **❌ Incorrect Way**
```python
def fn_get_customer_order_count(ia_sales_orders, i_customer_name):
    la_customer_names = [ld_order[i_customer_name] for order in ia_sales_orders]
    return la_customer_names.count(i_customer_name)
fn_get_customer_order_count(ia_sales_orders, "customer")
```
**Why it's incorrect:**

- Creates a temporary list of customer names — inefficient for large datasets.
- Requires two passes: one to create the list, another to count.
- Doesn't scale well for systems handling thousands of records.


** ✅ Correct Way**
```python
def fn_get_customer_order_count(ia_sales_orders, i_customer_name):
    """
    Count the number of sales orders for a given customer.

    Parameters:
        ia_sales_orders (list[dict]): List of sales order dictionaries with 'customer' keys.
        i_customer_name (str): Customer name to count.

    Returns:
        int: Number of matching sales orders.
    """
    return sum(1 for ld_order in ia_sales_orders if ld_order[i_customer_name] == i_customer_name)
fn_get_customer_order_count(ia_sales_orders, "customer")
```

**Why it's incorrect:**

- Memory-efficient: Doesn't create any extra list.
- Single-pass: Evaluates and counts in one loop.
- Scalable: Works well even for large datasets.

**Sample Input:**

```python
la_sales_orders = [
    {
        "sales_order": "SAL-ORD-2025-00001",
        "customer_name": "ABB AG",
        "delivery_date": "15-06-2025",
        "item_code": "DTTHZ2/800/10/28/400/75",
        "order_value": "12.500,00",
        "po_date": "20-05-2025"
    },
    {
        "sales_order": "SAL-ORD-2025-00002",
        "customer_name": "John",
        "delivery_date": "01-07-2025",
        "item_code": "DTTHZ3/630/20/22/450/85",
        "order_value": "9.800,00",
        "po_date": "25-05-2025"
    },
    {
        "sales_order": "SAL-ORD-2025-00003",
        "customer_name": "John",
        "delivery_date": "05-07-2025",
        "item_code": "DTTHZ3/630/20/22/450/90",
        "order_value": "10.200,00",
        "po_date": "26-05-2025"
    }
]
l_customer_name = "John"
l_order_count = fn_get_customer_order_count(la_sales_orders, l_customer_name)
print(f"Sales order count for {l_customer_name}: {l_order_count}")
```

**Sample Output**
```
Sales order count for John: 2
```
---

## frappe utility functions for date 

Frappe provides utility functions for handling dates and times efficiently, enabling developers to work with business logic involving delivery dates, document validity, weekly schedules, etc.

**Key functions:**
-  frappe.utils.getdate(date_str)
 - frappe.utils.date_diff(end_date, start_date)
-  getdate().isocalendar() – for getting ISO week/year/day-of-week.

**1. getdate:**
Converts a string or datetime into a Python date object. Ensures consistent format for all date operations within Frappe apps.

 **❌ Incorrect Way:**
 Using raw strings or datetime objects without conversion:
```py
l_date = "2025-05-29"
print(l_date) 
```
 **✅ Correct Way:**
 Use getdate() to standardize all date inputs
 ```python
l_date_obj = frappe.utils.getdate("2025-05-04")
print("getdate:", l_date_obj)
 ```
 **Sample Output:**
 ```
 getdate: 2025-05-04
 ```
**2. date_diff:**
Calculates the number of days between two dates. Accepts both date strings or Python date objects.

 **❌ Incorrect Way:**
Manually calculating days difference without converting strings to date objects:
```py
l_diff = ("2025-06-01" - "2025-05-29").days  
```
**✅ Correct Way:**
Use `date_diff()` to safely compute days difference with proper date conversion.
```python
l_date_1 = "2025-05-25"
l_date_2 = "2025-05-20"
#use abs to prevent negative result (ex: -5)
l_date_difference = abs(frappe.utils.date_diff(l_date_2, l_date_1))
print("date_diff:", l_date_difference)
```
**Sample Output:**
```
date_diff: 5
```
**3. isocalendar:**
Returns a tuple `(ISO year, ISO week number, ISO weekday)` for a given Python `date` object. Helps in week-based date processing.

 **❌ Incorrect Way:**
Attempting to manually calculate week numbers or weekdays, leading to errors or complex code.
```py
l_week_num = (l_date_obj.day - 1) // 7 + 1 
```
**✅ Correct Way:**
Use the built-in `.isocalendar()` method on a date object to get accurate ISO calendar details.
```python
la_iso_calendar = frappe.utils.getdate("2025-05-29").isocalendar()
print("isocalendar:", (la_iso_calendar[0], la_iso_calendar[1], la_iso_calendar[2]))
```
**Sample Output:**
```
isocalendar: (2025, 22, 4)
```
