---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

##  Steps to Configure the Action `Onload`

The **`Onload`** action is used to test specific field properties and behaviors when a form is first loaded.

> 🔹 **Note:** Leave the `Pos` (Position) value unchanged. It determines the execution order of the test steps.


### Configuration Guide



| **Field**        | **Description**                                                                 |
|------------------|----------------------------------------------------------------------------------|
| `Action`         | Set this to `Onload` to specify the test should run on form load.               |
| `Pos`            | Position number of the action. Leave this unchanged (e.g., `10`).               |
| `Field Name`     | The technical name of the field you want to test (e.g., `title`, `order_type`). |
| `Value`          | The expected value or label of the field (optional).                            |
| `Data Type`      | The data type of the field (e.g., `Select`, `Link`, `Data`).                    |
| `Is Mandatory`   | Mark as ✅ if the field should be mandatory.                                    |
| `Is Read Only`   | Mark as ✅ if the field should be read-only.                                     |
| `Is Hidden`      | Mark as ✅ if the field should be hidden.                                       |
| `Is Child`       | Mark this if the field belongs to a child table.                                |
| `Tab`            | The tab where the field is located, if applicable.                              |

---

###  Example Configuration

| No. | Pos   | Action  | Field Name   | Value    | Data Type | Is Mandatory | Is Read Only | Is Hidden | Is Child | Tab     |
|-----|-------|---------|--------------|----------|-----------|---------------|---------------|------------|----------|---------|
| 1   | 10    | Onload  |        |          |       |              |               |            |         |         |
| 2   | 10.01 | | order_type   | Sales    | Select    | ✅             | ✅             |            | ❌        | Details |
| 3   | 10.02 | | quotation_to | Customer | Link      |               |               | ✅          | ❌        | Details |



###  Summary

This configuration allows you to validate how fields behave when the form loads — ensuring they are mandatory, read-only, or hidden as required. 