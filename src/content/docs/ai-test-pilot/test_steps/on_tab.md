---
title: On Tab Action Configuration Guide
description: A guide to understanding and configuring the "On Tab" action in the Configurator.
---


The "On Tab" action is triggered when a user switches to a specific tab within a document. It allows for specific actions to be performed or validations to be triggered when a tab is selected, helping to ensure that the document is in the correct state as the user navigates through different sections or tabs.

### Purpose of the On Tab Action

- **Tab-Based Validation**: Ensures that certain fields or actions are validated or updated when the user navigates to a specific tab.
- **Conditional Logic**: Allows you to configure specific logic or field behavior based on the selected tab.
- **User Experience**: Improves the user experience by dynamically managing fields, making sure the right content is displayed or the right checks are made when switching tabs.

### Required Fields for On Tab Action

To configure the "On Tab" action properly, the following fields are typically required:

- **tab_name**: Specifies the name of the tab that the action should be associated with. The action is triggered when the user switches to this particular tab.
- **action**: Defines the action or validation that should occur when the tab is selected.
- **field_name**: The name of any field whose properties or behavior should be changed based on the tab selection (e.g., show, hide, make read-only, etc.).
- **data_type**: Specifies the data type of the field that may be affected by the tab action (e.g., text, number, date).

### Additional Properties to Check for On Tab Action

You can also configure additional properties that define how the fields and actions behave when a tab is selected:

- **is_mandatory**:  
  Defines whether fields in the selected tab should be treated as mandatory when the user switches to the tab.

- **is_hidden**:  
  Allows you to hide certain fields when a specific tab is selected, providing a more focused user experience.

- **is_read_only**:  
  Makes fields within the selected tab read-only, preventing any modification when the user navigates to that tab.

### Workflow for On Tab Action

1. **Tab Selection**: When the user switches to a particular tab, the "On Tab" action is triggered.
2. **Field Configuration**: Based on the tab that is selected, certain fields may be displayed, hidden, made mandatory, or read-only according to the configuration.
3. **Dynamic Updates**: The document is dynamically updated to ensure that the right fields or actions are displayed based on the tab selection.

### Example Use Cases

1. **Field Visibility Based on Tab**: If the user navigates to the "Shipping" tab, show the "shipping_address" field and hide any unrelated fields from other tabs.
2. **Making Fields Mandatory on Tab**: Make the "payment_method" field mandatory when the user switches to the "Payment" tab.
3. **Read-Only Fields on Certain Tabs**: When viewing the "Invoice" tab, ensure that the "invoice_number" field is read-only to prevent modification.

### Further Reading

- Learn more about [how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework.
