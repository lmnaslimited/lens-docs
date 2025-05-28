---
title: On Change Action Configuration Guide
description: A guide to understanding and configuring the "On Change" action in the Configurator.
---


The "On Change" action is triggered when any field value is modified within a document. It is used to check the values of the dependent fields and ensure that the document remains consistent and valid when any field value is changed. This action applies to both new document creation and updates to existing documents.

### Purpose of the On Change Action

- **Field Validation**: Ensures that when any field value is modified, dependent fields are checked and updated accordingly.
- **Dependency Checking**: Automatically adjusts related fields based on changes made to a specific field.
- **Consistency**: Helps maintain the integrity of the document by ensuring all dependent fields are appropriately checked after any change.

### Required Fields for On Change Action

To properly configure the "On Change" action, the following fields are mandatory:

- **field_name**: The name of the field that triggers the "On Change" action when its value is changed.
- **value**: The new value that the field is set to after the change.
- **tab**: Specifies which tab the field belongs to in the document structure.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure proper handling during validation.

### Additional Properties to Check for On Change Action

Besides the required fields, you may need to configure additional properties to ensure the "On Change" action functions as expected. These properties ensure that the dependent fields are properly validated and updated when the triggering field value is changed.

- **is_mandatory**:  
  Ensures that if a field is marked as mandatory, it must be filled out after a change to maintain the validity of the document.

- **is_hidden**:  
  Allows you to define whether the field is hidden after a change while still keeping the data intact.

- **is_read_only**:  
  Marks the field as read-only after the change, preventing the user from modifying it further.

### Workflow for On Change Action

1. **Document Creation**: When a new document is created, the "On Change" action will verify that the dependent fields are correctly set based on any changes made to the document.
2. **Existing Document Update**: When a field value is changed in an existing document, the action will check whether the dependent fields need to be adjusted based on the new value of the modified field.

### Example Use Cases

1. **Field Dependency Checking**: If the "status" field is changed from "Draft" to "Approved," automatically update the "approval_date" field with the current date.
2. **Mandatory Field Enforcement**: Ensure that the "customer_name" field is mandatory when the "customer_id" field is modified.
3. **Read-Only Fields After Change**: Make the "invoice_number" field read-only after any changes are made to prevent further modifications.
