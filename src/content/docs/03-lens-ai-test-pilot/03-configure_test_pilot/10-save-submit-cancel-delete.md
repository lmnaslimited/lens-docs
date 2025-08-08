---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

## Steps to Configure Save, Submit, Cancel, and Delete Actions

These actions simulate basic user operations on forms in **Lens AI Test Pilot**. They help you test how the form behaves during each critical state change — from saving to deleting.

> 🔹 **Note:**
> - These actions are **standalone**, meaning they don’t require field-level input.
> - Typically placed at **top-level positions** (e.g., `10`, `20`, `30`, `40`), based on when they occur in the test sequence.


### Configuration Guide

| **Field**      | **Description**                                                        |
|----------------|-------------------------------------------------------------------------|
| `Action`       | Use one of: `Save`, `Submit`, `Cancel`, or `Delete`.                   |
| `Pos`          | Order of the action in the test sequence (e.g., `10`, `20`, etc.).     |
| `Field Name`   | Leave blank.                                                           |
| `Value`        | Leave blank.                                                           |
| `Data Type`    | Not applicable.                                                        |
| `Is Child`     | Not applicable.                                                        |
| `Tab`          | Not required.                                                          |

---

###  Example Configuration: Save → Submit → Cancel → Delete

| No. | Pos  | Action  | Field Name | Value | Data Type | Is Child | Tab     |
|-----|------|---------|------------|-------|-----------|----------|---------|
| 1   | 10   | Save    |            |       |           |          |         |
| 2   | 20   | Submit  |            |       |           |          |         |
| 3   | 30   | Cancel  |            |       |           |          |         |
| 4   | 40   | Delete  |            |       |           |          |         |

---

###  Summary

- **Save**: Triggers form save; validates required fields and triggers server-side logic.
- **Submit**: Submits the form and locks it (if applicable).
- **Cancel**: Cancels a previously submitted form (reverts it to draft).
- **Delete**: Deletes the form permanently.


