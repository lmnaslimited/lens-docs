---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

##  Steps to Configure `Expand Section` Action

The **`Expand Section`** action is used to test the behavior of collapsible sections within a form. You can specify which section to expand and validate the fields that appear after expansion.

> 🔹 **Note:**  
> - Use a top-level `Pos` (e.g., `10`) for the action to expand the section.  
> - Use follow-up positions (`10.01`, `10.02`, etc.) to validate fields revealed after expansion.  
> - `Section Field` refers to the section heading or field name that controls the collapsible area.


###  Configuration Guide

| **Field**        | **Description**                                                                 |
|------------------|----------------------------------------------------------------------------------|
| `Action`         | Set to `Expand Section` to expand a collapsible section.                        |
| `Pos`            | The sequence number of the action (e.g., `10`).                                 |
| `Section `  | The name of the section you want to expand.                                     |
| `Field Name`     | In follow-up rows: the specific field(s) to validate inside the expanded section. |
| `Value`          | The expected value (if applicable).                                              |
| `Data Type`      | The type of field (e.g., `Data`, `Select`).                                      |
| `Is Mandatory`   | ✅ if the field should be mandatory.                                              |
| `Is Read Only`   | ✅ if the field should be read-only.                                              |
| `Is Hidden`      | ✅ if the field should be hidden.                                                 |
| `Is Child`       | ✅ if the field is inside a child table (optional here).                         |
| `Tab`            | The tab where the section is located (if applicable).                           |



###  Example Configuration: Expand a Section and Validate Fields

| No. | Pos    | Action         | Section      | Field Name        | Value     | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Tab     |
|-----|--------|----------------|-------------------|-------------------|-----------|-----------|---------------|---------------|------------|----------|---------|
| 1   | 10     | Expand Section | additional_info    |                   |           | Section   |               |               |            |      | Details |
| 2   | 10.01  |                |                   | customer_category  | Gold      | Select    | ✅             |               |            | ❌        | Details |
| 3   | 10.02  |                |                   | remarks            |  No         | Data      |               | ✅             |            | ❌        | Details |



### Summary

Use the `Expand Section` action to test visibility and validations of fields inside collapsible form sections. 