---
title: Programming Standards - Data Selection
---

## Best Practices

| **Coding Standard**                       | **Description**                                                                 |
|-------------------------------------------|---------------------------------------------------------------------------------|
| Use Frappe ORM (Object Relational Mapper) methods  | Use built-in Frappe functions to fetch data efficiently and safely.    |
| Use `filters` parameter                   | Apply dictionary-style filters to retrieve specific records.                    |
| Use `fields` to limit fetched columns     | Optimize performance by selecting only required fields.                         |
| Use `limit` or `limit_page_length`        | Restrict result size to improve speed and avoid overload.                       |
| Avoid raw SQL unless necessary            | Prefer ORM unless SQL is essential for complex or optimized queries.            |
| Use `order_by` for sorted results         | Ensure consistent data output order.                                            |
| Check for null/empty filters              | Avoid passing `None` in filters by validating inputs.                           |
| Respect user permissions                  | Always enforce access control.                                                  |
| Avoid hardcoding DocTypes or fieldnames   | For better maintainability.                                                     |
| Paginate large data results               | Load data in chunks to handle large datasets efficiently.                       |
| Use caching when appropriate              | Cache static or rarely changing data to reduce load and improve speed.          |
| Error handling for data queries           | Wrap queries with `try-except` blocks to catch and log data issues gracefully. |
| Indexing consideration                    | Ensure frequently queried fields are indexed for performance.                  |
| Avoid nested queries when possible        | Keep queries simple to make them easier to read and faster to run.             |

## Use Case

## 1. **Use Frappe ORM methods**
**Use Case:** Fetching data using built-in ORM.
```python
employees = frappe.get_all("Employee", filters={"status": "Active"})
```

## 2. **Use fields to limit fetched columns**
**Use Case:** Fetch only names and emails.
```python
employees = frappe.get_all("Employee", fields=["name", "email"], filters={"status": "Active"})
```

## 3. **Use limit or limit_page_length**
**Use Case:** Fetch first 10 active employees.
```python
employees = frappe.get_all("Employee", filters={"status": "Active"}, limit=10)
```

## 4. **Avoid raw SQL unless necessary**
**Use Case:** Only use SQL for optimized aggregation.
```python
# Only when needed
data = frappe.db.sql("""
    SELECT department, COUNT(*) FROM `tabEmployee`
    GROUP BY department
""", as_dict=True)
```

## 5. **Paginate large data results**
**Use Case:** Fetch data with page size.
```python
page_size = 20
employees = frappe.get_all("Employee", limit_page_length=page_size, limit_start=0)
```
