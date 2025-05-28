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
| Use `frappe.qb` for complex joins         | Employ Query Builder for multi-table queries.                                   |
| Paginate large data results               | Load data in chunks to handle large datasets efficiently.                       |
| Use caching when appropriate              | Cache static or rarely changing data to reduce load and improve speed.          |
| Error handling for data queries           | Wrap queries with `try-except` blocks to catch and log data issues gracefully. |
| Indexing consideration                    | Ensure frequently queried fields are indexed for performance.                  |
| Avoid nested queries when possible        | Keep queries simple to make them easier to read and faster to run.             |