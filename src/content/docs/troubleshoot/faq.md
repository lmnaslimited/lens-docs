---
title: Frequently Asked Questions (FAQ)
description: Answers to common questions regarding adding test configurations in the "Test Fields" child table.
---

## Frequently Asked Questions (FAQ)

### 1. **What is the "Test Fields" child table?**
The "Test Fields" child table is where you can configure test actions, fields, values, and their properties. This table is used to automate and validate test configurations for different actions like `on_load`, `on_change`, and others.

---

### 2. **How do I add a new row for a test action?**
To add a new row for a test action, click on the "Add Row" button in the respective action section (e.g., `on_load`, `on_change`). This will allow you to enter the field name, values, tabs, and properties for that particular action.

---

### 3. **What does the POS value represent?**
The **POS** (Position) value determines the order of rows in the configuration. At the header level, the POS will automatically be set (e.g., `10` for `on_load`), and for child rows, the POS will increment automatically (e.g., `10.01`, `10.02`).

---

### 4. **Can I modify the properties of a field?**
Yes, if a field has specific properties, you can enable or disable them as needed. These properties include options like **Mandatory**, **Hidden**, and others based on your needs.

---

### 5. **What are the different actions available?**
You can configure the following actions in the "Test Fields" table:
- **on_load**
- **on_change**
- **on_tab**
- **on_validate**
- **on_menu**
- **after_save**
- **on_submit**
- **after_submit**

Each action allows you to define specific fields and their behavior in your test configurations.

---

### 6. **How do I know when to use each action?**
- Use **on_load** when you need to perform an action when the form or page loads.
- Use **on_change** for actions triggered by field value changes.
- Use **on_tab** for actions when a tab is selected.
- Other actions like **on_validate**, **after_save**, etc., are for actions triggered by specific events like validation, saving, or submitting.

---

### 7. **Can I add multiple rows for the same action?**
Yes, you can add multiple rows for the same action to configure different fields, values, and properties. Each row will have its own POS value to maintain the correct order.

---

## Further Reading

- [Read more about test configurations](https://diataxis.fr/how-to-guides/) in the Diátxis framework.
