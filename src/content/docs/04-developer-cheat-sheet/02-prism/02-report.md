---
title: PRISM - Report
---
## frappe.utils.getdate()

* Converts a string like `"2024-12-28"` to a Python date object
* Useful for standardizing date inputs before performing comparisons or calculations

**Command Syntax**

```python
 frappe.utils.getdate(i_date_string)
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| ``date_string``  |  String  |  A valid date string (e.g. "2024-12-28")      |

**Common Patterns or Use Cases**
* Converting string input into a date object for safe comparison
```python
l_date=frappe.utils.getdate("2025-05-12")
```
**Sample Output :**
```python
(2025,05,12)
```
## isocalendar()

* Returns a tuple with the ISO year, ISO week number, and ISO weekday for a given date.
* Useful for building week-based reports and ensuring proper calendar logic across years.

**Prerequisite:**
A valid Python `date` object (e.g., from `frappe.utils.getdate()`)

**Command Syntax**

```python
l_date.isocalendar()
```
**Return Value**
A tuple in the format:  
```python
(ISO year, ISO week number, ISO weekday)
```

| Index | Value              | Example | Description                                  |
|-------|--------------------|---------|----------------------------------------------|
| `[0]` | ISO year           | `2024`  | Usually same as calendar year (sometimes different in early Jan or late Dec) |
| `[1]` | ISO week number    | `19`    | Week number in the year (1–53)               |
| `[2]` | ISO weekday        | `7`     | Day of the week (1 = Monday, ..., 7 = Sunday)|

**Common Patterns or Use Cases**
* Getting ISO calendar values for a date:
```python
l_date = frappe.utils.getdate("2024-05-12")
iso_parts = l_date.isocalendar()
```

* Extracting just the ISO year:
```python
iso_year = l_date.isocalendar()[0]  # → 2024
```

* Extracting week number for reports:
```python
week_num = l_date.isocalendar()[1]  # → 19
```

**Sample Output**
```python
(2024, 19, 7)
```

## Creating a List from List of Dictionaries 

* Extracts values for a specific field (key) from a list of Frappe document dictionaries
* Commonly used after fetching data using `frappe.db.get_all()` or `frappe.get_all()`

**Prerequisite :**
```python
# Get a list of Sales Invoices with their customer names
la_invoices = frappe.get_all("Sales Invoice", fields=["name", "customer"])
```
**Command Syntax**
```python
[field_dict["field_name"] for field_dict in list_of_dicts]
```
**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `list_of_dicts`  |  List of Dicts  |  Output from `frappe.get_all()` or any list of dicts      |
|`field_name`  |  String (key)  |  Field to extract from each dictionary     |

**Common Patterns or Use Cases**
* Create a list of customer names from Sales Invoices
```python
la_customer_list = [inv["i_customer"] for inv in ia_invoices]

```
**Sample Output :**
```python
['John Grey', 'Bonnie', 'John Grey','Sara']
```
## Removing Duplicates from List in Frappe

* Use `set()` to remove duplicate entries from a list
* Useful for getting distinct values like unique customers or items
* Convert the set back to a list using `list()` for further use

**Prerequisite :**
```python
# Assume this came from Sales Invoice records
la_customer_list = ['John Grey', 'Bonnie', 'John Grey','Sara']
```
**Command Syntax**
```python
list(set(your_list))
```
**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| ``your_list``  |  List  |  A list that may contain duplicates (e.g., customers) |

**Common Patterns or Use Cases**
* Get unique customer names from invoice list
```python
la_unique_customers = list(set(la_customer_list))
```
**Sample Output :**
```python
['John Grey', 'Bonnie','Sara']
```
## Passing Parameters in frappe.db.sql()

* Safe SQL in Frappe with Parameter Dicts
* When using `frappe.db.sql()`, always pass parameters using a dictionary to prevents SQL injection, easier to read and lets you reuse queries dynamically


**Prerequisite :**
```python
# Sample filter dictionary from a report
filters={
"from_date":"2024-10-23"
"to_date": "2025-10-26"}
```
**Command Syntax**
```python
frappe.db.sql(query, parameters, as_dict=1)
```
**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `parameters`   | Dict      | Key-value pairs to safely insert into the query   |

**Common Patterns or Use Cases**
* Pass dynamic values like date or  item code
```python
filters = {
    "from_date": "2024-01-01",
    "to_date": "2024-01-31"
}
result = frappe.db.sql(
    "SELECT name FROM `tabSales Order` WHERE transaction_date BETWEEN %(from_date)s AND %(to_date)s",
    filters
)

```
**Sample Output :**
```python
[('SO-0001',), ('SO-0002',)]

```


## `as_dict` 

* Use `as_dict=1` to return SQL query results as **dictionaries** instead of tuples
* Makes it easier to access fields by name (e.g., `row["name"]`) instead of by index
* Improves readability and reduces bugs in report scripts

**Prerequisite :**

```python
# A sample SQL query using frappe.db.sql
query = "SELECT name, status FROM `tabSales Order`"
```
**Command Syntax**
```python
frappe.db.sql(query, parameters, as_dict=1)
```
**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `as_dict` | Boolean  |  Return results as dictionaries if `True`          |

**Common Patterns or Use Cases**
* Retrieve results as dictionaries for easy key-based access
```python
ld_result = frappe.db.sql(
    "SELECT name FROM `tabSales Order`",
    as_dict=1
)

```
**Sample Output :**
```python
[{"name": "SO-0001"}, {"name": "SO-0002"}]

```
## frappe.db.sql()
* Use `frappe.db.sql()` when `frappe.get_all()` cannot handle advanced queries.
`frappe.get_all()` is easy and safe, but it has limitations:

- It doesn't handle `BETWEEN` filters well.
- You can't write custom `JOIN`s or complex logic.
- You can't use SQL-specific features like `GROUP BY`, `ORDER BY`, or subqueries.

**Prerequisite :**
```python
# Sample filter dictionary from a report
filters = {
    "start": "2024-01-01",
    "end": "2024-01-31"
}
```

**Command Syntax**
```python
frappe.db.sql(query, parameters, as_dict=1)
```

**Parameters & Options**
| Parameter      | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| `query`        | String    | Your SQL query string with placeholders           |
| `parameters`   | Dict      | Key-value pairs to safely insert into the query   |
| `as_dict`      | Boolean   | Return results as dictionaries if `True`          |

**Common Patterns or Use Cases**
* Filter sales orders within a date range
```python
ld_result = frappe.db.sql(
    "SELECT name FROM `tabSales Order` WHERE transaction_date BETWEEN %(from_date)s AND %(to_date)s",
    {"from_date": "2024-01-01", "to_date": "2024-01-31"},
    as_dict=1
)
```

**Sample Output :**
```python
[
    {"name": "SO-0001"},
    {"name": "SO-0002"}
]
```