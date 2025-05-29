---
title: PRISM - Report
---
## frappe.utils.getdate()
---
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
---
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
