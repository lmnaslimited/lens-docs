---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

##  Steps to Configure the Action `OnChange`

The **`OnChange`** action allows you to simulate a change in a field and test the expected behavior of related fields after that change. This is useful for validating dynamic field updates and dependencies.

> 🔹 **Note:**  
> - The **first entry** (e.g., Pos `10`) defines the field that will be changed and the value it will be set to.  
> - The **following entries** (e.g., `10.01`, `10.02`) define the fields that should be **checked** after the change.

### Configuration Guide

| **Field**        | **Description**                                                                 |
|------------------|----------------------------------------------------------------------------------|
| `Action`         | Set the first row to `OnChange` for the field to be modified. Leave subsequent rows blank. |
| `Pos`            | Position number of the action (e.g., `10`, `10.01`, `10.02`).                    |
| `Field Name`     | The name of the field to modify or check.                                       |
| `Value`          | The value to set or validate.                                                   |
| `Data Type`      | The type of the field (e.g., `Data`, `Select`, `Link`).                         |
| `Is Mandatory`   | Mark as ✅ if the field should be mandatory.                                     |
| `Is Read Only`   | Mark as ✅ if the field should be read-only.                                     |
| `Is Hidden`      | Mark as ✅ if the field should be hidden.                                        |
| `Is Child`       | Mark this if the field belongs to a child table.                                |
| `Tab`            | The tab where the field is located.                                             |

---

###  Example Configuration: OnChange of `Customer` Field

| No. | Pos    | Action    | Field Name     | Value    | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Tab                |
|-----|--------|-----------|----------------|----------|-----------|---------------|---------------|------------|----------|---------------------|
| 1   | 10     | OnChange  | customer        | ABBAG    | Data      | ✅             |               |            |          | Details             |
| 2   | 10.01  |           | address         | ABBAG-01 | Data      | ✅             |               |            | ❌        | Address and Contact |
| 3   | 10.02  |           | currency    | EUR | Link      |               |               | ✅          | ❌        | Details             |

---

###  Summary

- Use **`OnChange`** to simulate user interactions like selecting a customer, item, or option.
- After simulating a value change (Pos `10`), use follow-up positions (`10.01`, `10.02`, etc.) to validate other fields that are affected.
