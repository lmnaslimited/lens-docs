---
title: On Load Action Configuration Guide
description: A guide to understanding and configuring the "On Load" action in the Configurator.
---

## On Load Action

The "On Load" action is triggered when a new document is created or an existing document is opened. This action is used to check and set default values for fields, verify field properties like mandatory and read-only settings, and ensure that the document is set up correctly when it is loaded. 

### Purpose of the On Load Action

- **Default Values**: Automatically sets default values for fields when a new document is loaded.
- **Field Properties**: Verifies field properties such as mandatory, read-only, and hidden statuses.

### Required Fields for On Load Action

To properly configure the "On Load" action, the following fields are mandatory:

- **field_name**: Specifies the name of the field to apply the action on.
- **value**: Defines the value that should be set for the field when the document is loaded.
- **tab**: Specifies which tab the field belongs to in the document structure.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure proper handling.

### Additional Properties to Check for On Load Action

In addition to the required fields, you can configure additional properties to check during the "On Load" action. These properties ensure that the fields behave according to the specified requirements when the document is loaded.

- **is_mandatory**:  
  Ensures the field is marked as mandatory. If the field is mandatory, it must be filled out by the user.
  
- **is_hidden**:  
  Makes the field hidden from the user interface, while still maintaining the field's value in the document.
  
- **is_read_only**:  
  Disables the field for editing, making it read-only. The user can view the field but cannot modify its value.

### Workflow for On Load Action

1. **Document Creation**: When a new document is created, the "On Load" action will check and set default values for the fields.
2. **Existing Document**: When an existing document is opened, the action will check whether the field properties (mandatory, read-only, hidden) are still valid and make any necessary adjustments.

### Example Use Cases

1. **Setting Default Values**: Automatically set the "status" field to "Draft" when a new document is created.
2. **Ensuring Required Fields**: Make sure that fields like "customer_name" or "email" are mandatory when a document is loaded.
3. **Making Fields Read-Only**: When viewing an existing document, ensure that fields like "invoice_number" are set to read-only to prevent modification.

### Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework.
