---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

## Steps to Configure `Edit Details` for Child Tables

Use the **`Edit Details`** action when you want to validate fields **inside the popup view** of a child table row (e.g., inside the "Items" row editor).

> 🔹 **Note:**
> - `Edit Details` should be placed in the **main position** (e.g., `20`).
> - It specifies the **child table name** and **row index** where the popup opens.
> - The rows under it (e.g., `20.01`, `20.02`) define the **fields and values to check inside the Edit Details view**.

###  Configuration Guide

| **Field**           | **Description**                                                                  |
|---------------------|-----------------------------------------------------------------------------------|
| `Action`            | Set `Edit Details` in the main row to indicate you're opening the child row popup. |
| `Pos`               | `20` for the main action; use `20.01`, `20.02`, etc., for validations inside.     |
| `Field Name`        | The field to validate inside the Edit Details view.                              |
| `Value`             | The expected value of the field.                                                  |
| `Data Type`         | Type of the field (e.g., `Link`, `Data`, `Select`).                              |
| `Is Mandatory`      | ✅ if the field should be mandatory.                                              |
| `Is Read Only`      | ✅ if the field should be read-only.                                              |
| `Is Hidden`         | ✅ if the field should be hidden.                                                 |
| `Is Child`          | ✅ for all fields inside a child table row.                                       |
| `Child Table Name`  | Name of the child table (e.g., `items`).                                         |
| `Child Index`       | Index of the row to validate (e.g., `0` for first row).                          |
| `Tab`               | Tab where the child table is located (e.g., `Details`).                          |

---

### Example Configuration: Validating Fields Inside Edit Details View

| No. | Pos    | Action        | Field Name   | Value               | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Child Table Name | Child Index | Tab     |
|-----|--------|---------------|--------------|----------------------|-----------|---------------|---------------|------------|----------|------------------|--------------|---------|
| 1   | 20     | Edit Details  |              |                      |           |               |               |            | ✅        | items            | 0            | Details |
| 2   | 20.01  |               | warehouse     | Stores - SGBCZ       | Link      | ✅             |               |            | ✅        | items            | 2           | Details |
| 3   | 20.02  |               | item_name     | DTTHZ1N 400/20/...   | Data      | ✅             |               |            | ✅        | items            | 2            | Details |
| 4   | 20.03  |               | amount        | 17,206.00            | Data      | ✅             |               |            | ✅        | items            | 2            | Details |


###  Summary

- Use `Edit Details` (e.g., at Pos `20`) to validate fields inside a child table row popup.
- All child-row validations go under that (e.g., `20.01`, `20.02`).
- Always set `Is Child` and specify the correct `Child Table Name` and `Child Index`.

