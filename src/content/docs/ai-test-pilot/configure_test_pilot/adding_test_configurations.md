---
title: Adding Test Configurations in Test Fields Child Table
description: A guide to help you configure test actions, fields, and values in the "Test Fields" child table.
---

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps. Writing a good guide requires thinking about what your users are trying to do.

## Steps to Add Test Configurations

### 1. **Adding an `on_load` Action**

- **Add Row**: Click on the "Add Row" button to create a new row.
- **Select Action**: In the "Action" field, select **`on_load`**.
- **POS**: The **POS** will be automatically set to `10` since it's a header level.
- **Header Configuration**: No further input is needed at the header level.

---

### 2. **Adding Fields, Values, and Tabs for `on_load`**

- In the subsequent rows, add **Field Name**, **Values**, and **Tabs** if applicable.
- Enable any **properties** like **Mandatory** or **Hidden** as required by the field.
- The **POS** for these rows will be set incrementally (e.g., `10.01`, `10.02`).

---

### 3. **Changing Action to `on_change`**

- **Add New Row**: Click to add a new row.
- **Select Action**: Change the action field to **`on_change`**.
- **POS**: The **POS** will automatically update to `20`.

- Repeat the process for **Field Name**, **Values**, **Tabs**, and **Properties**.

---

### 4. **Other Actions**

You can add other actions such as:

- **on_tab**
- **on_validate**
- **on_menu**
- **after_save**
- **on_submit**
- **after_submit**

For each action:

- **Add Row**: Create a new row.
- **Select Action**: Choose the corresponding action (e.g., `on_tab`, `on_validate`).
- **POS**: The **POS** will follow the same incremental numbering (e.g., `30`, `40`, etc.).
- **Field Configuration**: Continue to add **Field Name**, **Values**, **Tabs**, and **Properties** as needed.

---
