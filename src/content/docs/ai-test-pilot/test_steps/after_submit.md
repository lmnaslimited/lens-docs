---
title: After Submit Action Configuration Guide
description: A guide to understanding and configuring the "After Submit" action in the Configurator.
---

## After Submit Action

The "After Submit" action is triggered immediately after a document is submitted. This action is used to perform post-submission tasks such as logging data, updating related records, sending notifications, or performing additional checks. It ensures that the document undergoes any final adjustments or actions required after the submission process is complete.

### Purpose of the After Submit Action

- **Post-Submission Validation**: Ensures that any final checks or updates are made after the document has been submitted.
- **Notification Triggers**: Can be configured to send notifications or alerts after a document is submitted.
- **Data Synchronization**: Used to synchronize data with other systems or perform integrations after submission.
- **Logging and Auditing**: Helps track submission details, log events, or generate reports after the document is submitted.

### Required Fields for After Submit Action

To properly configure the "After Submit" action, the following fields are typically required:

- **field_name**: Specifies the name of the field that needs to be checked or updated after submission.
- **value**: Defines any changes or updates that should be made to the field once the document is submitted.
- **tab**: Specifies which tab the field belongs to, making it easier to organize actions on specific sections of the document.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure proper handling of the field after submission.

### Additional Properties to Check for After Submit Action

Besides the required fields, you may need to configure additional properties for fields involved in the "After Submit" action:

- **is_mandatory**:  
  Ensures that any field marked as mandatory is properly handled after the document is submitted. If needed, additional validation checks can be applied even after submission.

- **is_hidden**:  
  Allows for certain fields to be hidden from the user interface but remain in the system, even after the document is submitted.

- **is_read_only**:  
  Makes fields read-only after submission to prevent further edits and ensure that submitted data remains unchanged.

### Workflow for After Submit Action

1. **Document Submission**: The user submits the document, triggering the "After Submit" action.
2. **Post-Submit Tasks**: After submission, the system performs any necessary tasks such as updating records, sending notifications, or performing final checks.
3. **Final Adjustments**: The system may update fields or synchronize data across systems based on the submission action.
4. **Confirmation or Reporting**: After all tasks are completed, the system may generate logs, reports, or provide a confirmation message to the user.

### Example Use Cases

1. **Sending Notifications**: After a document is submitted, automatically send an email notification to the user confirming that the document has been submitted successfully.
2. **Update Related Records**: After submission, update the status of a related "order" or "invoice" record to reflect the newly submitted document.
3. **Log Submission Details**: Log the submission details such as the user who submitted the document, the time of submission, and the status of the document for auditing purposes.
4. **Synchronize with External Systems**: After submission, synchronize the document data with external systems like a CRM or ERP system to keep all data up to date.

### Further Reading

- Learn more about [how-to guides](https://diataxis.fr/how-to-guides/) in the Diátxis framework.
