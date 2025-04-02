---
title: On Validate Action Configuration Guide
description: A guide to understanding and configuring the "On Validate" action in the Configurator.
---

## On Validate Action

The "On Validate" action is triggered when a field value needs to be validated before the document can proceed further. This action is used to perform validation checks on the field, ensuring that the values entered by the user meet the required criteria. If the field fails validation, an error or warning message can be displayed to guide the user in correcting the issue.

### Purpose of the On Validate Action

- **Field Validation**: Ensures that the field value entered by the user is correct and meets the defined criteria before the document can proceed.
- **Error Handling**: Provides a way to display custom error or warning messages to the user when validation fails.
- **User Guidance**: Helps the user understand what needs to be corrected by displaying descriptive messages for invalid fields.

### Required Fields for On Validate Action

To configure the "On Validate" action properly, the following fields are mandatory:

- **field_name**: Specifies the name of the field that is to be validated. This triggers the validation action when the field value is entered or modified.
- **value**: Defines the expected value or format that the field should have for it to be considered valid.
- **tab**: Specifies which tab the field belongs to, helping to organize the validation logic within the document structure.
- **data_type**: Specifies the data type of the field (e.g., text, number, date) to ensure that the field is validated properly.

### Additional Properties to Check for On Validate Action

In addition to the required fields, the following properties are typically included in the "On Validate" action:

- **message_type**:  
  Specifies the type of message to be displayed when validation fails. Common message types include:
  - **Error**: Indicates a critical issue that must be addressed before proceeding.
  - **Warning**: Provides a cautionary message that the user can choose to ignore, but should still be addressed.
  - **Information**: Displays an informational message to guide the user, without blocking further actions.

- **description**:  
  Provides a detailed description or custom message that explains why the field value is invalid and what the user needs to do to correct it. This description is shown to the user when validation fails.

### Workflow for On Validate Action

1. **Field Entry**: When the user enters or modifies the value of a field, the "On Validate" action is triggered.
2. **Validation Check**: The system checks if the entered value meets the required criteria for the field.
3. **Message Display**: If the validation fails, an error, warning, or informational message is displayed to the user, describing the issue and what needs to be corrected.
4. **User Action**: The user can correct the field value based on the validation message and continue with the document process.

### Example Use Cases

1. **Email Validation**: Validate that the "email" field contains a valid email address format. If the email is invalid, display an error message: "Please enter a valid email address."
2. **Numeric Range Check**: Ensure that the "age" field is within a valid range (e.g., 18 to 100). If outside the range, display a warning message: "Age must be between 18 and 100."
3. **Required Field Validation**: Check if the "customer_name" field is filled. If left empty, display an error message: "Customer name is required to proceed."

### Example Configuration for On Validate Action

```json
{
  "field_name": "email",
  "value": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",  
  "tab": "Personal Information",
  "data_type": "text",
  "message_type": "Error",
  "description": "Please enter a valid email address."
}
