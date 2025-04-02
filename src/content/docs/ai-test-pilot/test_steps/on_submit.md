---
title: On Submit Action Configuration Guide
description: A guide to understanding and configuring the "On Submit" action in the Configurator.
---


The "On Submit" action is triggered when a document is submitted. This action is used to perform checks, validations, or updates to the fields before the document is finalized or sent for processing. It ensures that all required fields are properly filled out, any necessary calculations are correct, and the document is ready for submission.

### Purpose of the On Submit Action

- **Final Validation**: Ensures that all required fields are filled and validated before the document is submitted.
- **Field Updates**: Makes any necessary updates or adjustments to the fields just before submission.
- **Data Integrity**: Maintains data integrity by ensuring the document is in the correct state before it is sent for further processing.

### Required Fields for On Submit Action

To properly configure the "On Submit" action, the following fields are mandatory:

- **field_name**: Specifies the name of the field to be checked or validated before submission.
- **value**: Defines the value that the field should have when the document is submitted, if any updates are needed.
- **tab**: Specifies which tab the field belongs to within the document structure to ensure the action is applied to the correct section.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure proper handling during the validation process.

### Additional Properties to Check for On Submit Action

You can configure additional properties to define the behavior of the fields during the "On Submit" action:

- **is_mandatory**:  
  Ensures that a field is marked as mandatory before submission. The document cannot be submitted unless all mandatory fields are filled out.

- **is_hidden**:  
  Allows a field to remain hidden from the user interface before submission while still maintaining its value in the document.

- **is_read_only**:  
  Makes a field read-only before submission, ensuring that no further changes can be made to the field once the user is ready to submit.

### Workflow for On Submit Action

1. **Document Submission**: When the user clicks the submit button or triggers the submission action, the "On Submit" action is triggered.
2. **Field Validation**: The system checks that all required fields are completed and meet the necessary criteria for submission.
3. **Final Adjustments**: Any field updates, calculations, or value corrections are performed before the document is officially submitted.
4. **Submission**: Once all checks and updates are completed, the document is submitted for processing.

### Example Use Cases

1. **Final Validation of Required Fields**: Before submitting the document, ensure that the "customer_email" and "customer_name" fields are filled out and valid.
2. **Automatically Set Status**: When submitting a document, automatically set the "status" field to "Submitted" to indicate the document's final state.
3. **Calculations on Submit**: Ensure that the "total_price" field is calculated based on the "unit_price" and "quantity" before submitting the document.

### Further Reading

- Learn more about [how-to guides](https://diataxis.fr/how-to-guides/) in the Diátxis framework.
