---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---
##  Steps to Configure Child Table Field Check

This configuration is used to **enter a value into a child table field** and then **validate other fields in the same child row** based on the input. It’s especially helpful when working with item tables or sub-forms.

> 🔹 **Note:**  
> - Set `Is Child` to ✅ to indicate it's a child table row.  
> - Specify the `Child Table Name` and `Child Index` to define where the value is being entered.  
> - Use follow-up `Pos` entries (`10.01`, `10.02`, etc.) to validate fields after the change.


###  Configuration Guide for Child Tables

| **Field**         | **Description**                                                                 |
|-------------------|----------------------------------------------------------------------------------|
| `Action`          | Use `OnChange` if the field update affects others; use `Onload` if loading data.|
| `Pos`             | Position number (e.g., `10`, `10.01`, etc.).                                     |
| `Field Name`      | The field inside the child table to set or validate.                             |
| `Value`           | The value to set or check.                                                       |
| `Data Type`       | Type of the field (e.g., `Link`, `Data`, `Select`).                              |
| `Is Mandatory`    | ✅ if the field should be mandatory.                                              |
| `Is Read Only`    | ✅ if the field should be read-only.                                              |
| `Is Hidden`       | ✅ if the field should be hidden.                                                 |
| `Is Child`        | ✅ if the field belongs to a child table.                                         |
| `Child Table Name`| Name of the child table (e.g., `items`).                                         |
| `Child Index`     | Row index where the action should occur (e.g., `0` for first row).               |
| `Tab`             | Tab where the child table is located.                                            |

---

### Example Configuration: Entering and Validating Child Table Fields

| No. | Pos    | Action    | Field Name     | Value        | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Child Table Name | Child Index | Tab       |
|-----|--------|-----------|----------------|--------------|-----------|---------------|---------------|------------|----------|------------------|--------------|-----------|
| 1   | 10     | OnChange  | item_code      | ITEM-001     | Link      | ✅             |               |            | ✅        | items            | 1            | Items     |
| 2   | 10.01  |           | rate           | 100.00       | Data      | ✅             |               |            | ✅        | items            | 1            | Items     |
| 3   | 10.02  |           | amount         | 100.00       | Currency  |               | ✅             |            | ✅        | items            | 1            | Items     |


###  Summary

- Use this format when you want to enter data into a **child table row** (like items in a sales invoice).
- After setting a value (e.g., `item_code`), validate fields like `rate`, `amount`, etc., within the same row.
- Be sure to specify `Child Table Name` and `Child Index` accurately for correct targeting.


