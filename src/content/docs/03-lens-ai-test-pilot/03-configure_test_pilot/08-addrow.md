---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

##  Steps to Configure `Add Row` Action

The **`Add Row`** action is used to simulate clicking "Add Row" in a child table (such as **Items**, **Taxes**, etc.). It is commonly followed by steps to enter and validate values in that newly added row.

> 🔹 **Note:**  
> - Set `Is Child` ✅ to indicate you're working in a child table.  
> - Specify `Child Table Name`, `Tab`, and the `Child Index` where the new row should be added or referenced.

###  Configuration Guide

| **Field**           | **Description**                                                                  |
|---------------------|-----------------------------------------------------------------------------------|
| `Action`            | Set to `Add Row` to insert a new row in the child table.                         |
| `Pos`               | Sequence/order of the action (e.g., `10`).                                       |
| `Field Name`        | Leave blank for `Add Row`.                                                       |
| `Value`             | Not applicable.                                                                  |
| `Data Type`         | Not applicable.                                                                  |
| `Is Mandatory`      | Not applicable for this action.                                                  |
| `Is Read Only`      | Not applicable for this action.                                                  |
| `Is Hidden`         | Not applicable for this action.                                                  |
| `Is Child`          | ✅ Must be enabled for child table operations.                                   |
| `Child Table Name`  | Name of the child table (e.g., `items`).                                         |
| `Child Index`       | Index at which the new row will be added (e.g., `1` for first row).              |
| `Tab`               | Tab where the child table is located (e.g., `Details`).                          |

###  Example Configuration: Adding a New Row in the "Items" Table at Index 1

| No. | Pos  | Action   | Field Name | Value | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Child Table Name | Child Index | Tab     |
|-----|------|----------|------------|-------|-----------|---------------|---------------|------------|----------|------------------|--------------|---------|
| 1   | 10   | Add Row  |            |       |           |               |               |            | ✅        | items            | 1            | Details |

###  Summary

- Use `Add Row` to simulate inserting a new row in a child table.
- Use the `Child Index` field to define where the row should appear (starting from `0` for the first row).
- After this, you can follow with additional steps (`10.01`, `10.02`, etc.) using actions like `OnChange` or `Edit Details` to set and validate fields in that row.

