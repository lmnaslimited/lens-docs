---
title: Programming Standards - Selection Criteria
---

## General Selection Criteria

| **Coding Standard**                          | **Description**                                                                 |
|----------------------------------------------|---------------------------------------------------------------------------------|
| Field must have a label                      | Use meaningful labels to describe each filter clearly.                          |
| Choose appropriate fieldtype                 | Match the filter fieldtype to the data it represents (Link, Select, etc.).      |
| Use tooltips or descriptions                 | Explain the purpose or expected input for the field.                            |
| Provide input help                           | Use built-in feature like calendar pickers, link dockype dropdowns.             |
| Mandatory filters must be explicitly marked  | Set `reqd = 1` in Doctype or report filter definition.                          |
| Mandatory filters must have default values   | Set defaults value (boolean / values) for required fields.                      |
| Validate filter inputs                       | Ensure formats are correct (dates, numbers, links, etc.).                       |
| Group filters logically                      | Use sections or positioning to group similar filters.                           |
| Use `get_query` for dynamic filters          | Filter Link/Select fields dynamically based on other filters or roles.          |
| Hide/show filters conditionally              | Use `depends_on` or JS to control visibility based on context.                  |
| Avoid excessive filters                      | Focus on the minimum filters needed for actionable reporting.                   |
| Write inline command                         | Add comments for any custom filtering logic (JS or Python).                     |
| Cache recent selections if possible          | Save filter state (locally/session) for better UX in frequent-use reports.      |
| Use `frappe.throw` for filter validation     | Show clear errors if invalid filters are submitted.                             |

---