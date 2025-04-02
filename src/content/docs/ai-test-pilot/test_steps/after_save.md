---
title: After Save Action Configuration Guide
description: A guide to understanding and configuring the "After Save" action in the Configurator.
---


The "After Save" action is triggered after a document has been saved. This action is used to perform additional validations, update related fields, or execute specific logic once the document is successfully saved. It ensures that any necessary checks or changes are made to the document after its data has been committed.

### Purpose of the After Save Action

- **Post-Save Validation**: Perform validation checks or adjustments after the document is saved to ensure data integrity.
- **Field Updates**: Automatically update related fields after saving the document.
- **Consistency Maintenance**: Ensure the document remains consistent and valid even after it has been saved.

### Required Fields for After Save Action

To properly configure the "After Save" action, the following fields are mandatory:

- **field_name**: Specifies the name of the field that needs to be checked or updated after the document is saved.
- **value**: Defines the value that the field should have after the document is saved, if any updates are needed.
- **tab**: Specifies which tab the field belongs to in the document structure for clarity and organization.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure the correct handling and validation of the field.

### Additional Properties to Check for After Save Action

In addition to the required fields, you can configure additional properties for fields in the "After Save" action:

- **is_mandatory**:  
  Ensures that the field is marked as mandatory after the document is saved, preventing the user from leaving it empty in the future.

- **is_hidden**:  
  Allows the field to be hidden after saving the document, while keeping the field value in the database intact.

- **is_read_only**:  
  Makes the field read-only after saving the document, ensuring that the value cannot be modified by the user after it has been saved.

### Workflow for After Save Action

1. **Document Save**: When the user saves the document, the "After Save" action is triggered.
2. **Post-Save Logic**: Once the document is saved, any defined post-save checks or updates to the fields are performed.
3. **Field Updates**: The system may automatically update values, set certain fields to read-only, or enforce mandatory rules after the document is saved.

### Example Use Cases

1. **Updating Status After Save**: When a document is saved, automatically update the "status" field to "Completed" once all required fields are filled out.
2. **Enforcing Data Integrity**: After saving, ensure that the "total_amount" field is calculated correctly based on the values in the "unit_price" and "quantity" fields.
3. **Making Fields Read-Only**: After a document is saved, make fields like "invoice_number" read-only to prevent further changes.

### Further Reading

- Learn more about [how-to guides](https://diataxis.fr/how-to-guides/) in the Diátxis framework.
