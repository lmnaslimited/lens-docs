---
title: Configurator Child Fields Guide
description: A guide to understanding and configuring child fields in the Configurator.
---

This guide explains the configuration of child fields in the Configurator. It details the parameters used to define actions, child tables, field names, and more.

## 1. pos
- **Description**: Differentiates actions at the header and child levels.
- **Details**: Actions are assigned position values in increments of 10 (e.g., 10, 20, 30). Dependent fields under each action increment by 0.01 (e.g., 10.01, 10.02).

## 2. action
- **Description**: Adds options to the existing drop-down to test various scenarios.
- **Options**:  
  - `On Validate`
  - `On Submit`
  - `After Save`
  - `After Submit`
  - `On Tab`

## 3. is_child
- **Description**: Indicates whether the field name of the doctype is a child.
- **Functionality**: If enabled, the child table field names will be listed in the `child_name`.

## 4. child_name
- **Description**: Lists all the child table names of the targeted doctype.
- **Details**: If `is_child` is enabled, the child table names from the targeted doctype will be listed. Select the child table to display its fields.

## 5. child_index
- **Description**: Specifies the index of a particular child table row.
- **Details**: When multiple rows exist in a child table, `child_index` will specify the row number to target.

## 6. field_name
- **Description**: Lists all the fields of the targeted doctype.
- **Functionality**: Provides a list of field names from which you can select one. By default, the parent fields are displayed in the child table. Select a specific child table name (e.g., `Items`), and fields from the selected child table will be shown.

## 7. value
- **Description**: Defines the value to be set for the field.
- **Details**: The value entered here will be assigned to the specified field.

## 8. tabs
- **Description**: Lists all the tabs of the targeted doctype.
- **Functionality**: Specify the tabs where the `field_name` is present.

## 9. section
- **Description**: Lists all the sections within a tab in the targeted doctype.
- **Functionality**: Helps to locate where the `field_name` is located within a section of a tab.

## 10. message_type
- **Description**: Specifies the type of message that will pop up.
- **Options**:
  - `Success`
  - `Validation Error`
  - Other custom message types.

## 11. description
- **Description**: Provides a description for the selected `message_type`.
- **Details**: For example, if the message type is `Success`, the message description will be stored and displayed accordingly.

## 12. menus
- **Description**: Stores the menu fields.
- **Details**: Contains the menu configurations used in the doctype for organizing and displaying actions and fields.

## 13. data_type
- **Description**: Specifies the type of the field (e.g., select, data).
- **Details**: This allows you to define what kind of data will be accepted in the field (e.g., Dropdown, Data).

## 14. add_row
- **Description**: Allows adding a new row in a specific child table.
- **Details**: This function is used when adding a new row to a child table, allowing the user to dynamically create entries within the table.

## 15. allow_on_submit
- **Description**: Specifies whether the field is editable after submission.
- **Details**: This checkbox determines if a field can still be edited once the form has been submitted. When enabled, the field remains editable.

## 16. is_read_only
- **Description**: Disables the field.
- **Details**: If enabled, this setting will make the field read-only, preventing any modifications by the user.

## 17. is_mandatory
- **Description**: Ensures the field is required.
- **Details**: This checkbox makes the field mandatory, ensuring that it must be filled out before submission. If unchecked, the field becomes optional.

## 18. is_hidden
- **Description**: Hides the field while keeping its value.
- **Details**: When enabled, this checkbox ensures that the field is hidden from the UI but retains its value behind the scenes. This is useful when you want to keep data without displaying it to the user.

## Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework.
