---
title: Programming Standards - Selection Criteria
---

### Field Representation
---
**Use Case:** A sales engineer is trying to find a specific quotation using the **Sales Table Report**, by specifying values like Material Type, Quotation Date, and Express Delivery.

**Standards:**

-   **Every field must have a clear and descriptive label.**  
    This ensures that users immediately understand what information is required.
    
-   **Internationalization support via  `__()`.**  
    Use the translation function for all labels and descriptions to support users in their preferred language (if preferred).
    
-   **Tooltips or descriptions are mandatory.**  
    Provide concise guidance to help users enter the correct information, reducing confusion.
        

**❌ Incorrect Way**

```js
filters: [
  {
    fieldname: "material",
    fieldtype: "Select", 
    label: "",  // No label — the user won’t know what this field is for
    // Missing description — no guidance on what this field does
    // Options were not provided for Select datatype
  },
  {
    fieldname: "delivary_date", // Typo: should be "delivery_date"
    fieldtype: "Date",
    label: "Delivery Date",
    // Missing description — no guidance on what this field does
  },
  {
    fieldname: "express_delivery",
    fieldtype: "Check",
    label: "Express Delivery",  // Not phrased as a question and not translated
    description: "Tick if you want your order to be processed with express delivery." 
  }
]
```

 **✅  Correct Way**

```js
filters: [
  {
    fieldname: "material_type", 
    fieldtype: "Select",  
    label: "Material Type",     // Clearly indicates the purpose of this field
    description: "Select the base material for the product" // Provides a tooltip to help the user understand the field's purpose
    options: ["Steel", "Aluminum", "Plastic", "Copper", "Other"] // Always provide options for Select fields so users can only choose valid, available values
  },
  {
    fieldname: "delivery_date", 
    fieldtype: "Date",      
    label: "Requested Delivery Date", // Clearly indicates which date is needed
    description: "The date the customer expects delivery" // Clarifies what the user should input here
  },
  {
    fieldname: "express_delivery",
    fieldtype: "Check",            
    label: __("Would you prefer Express Delivery?"), // Question-style label is best for checkboxes, as it prompts a clear yes/no response and is translated to the customer's language
    description:  __("Select the base material for the product") // Explains what checking the box means
  }
]
```

**Output:**


| **Field UI**     | **Label Shown**                               | **Tooltip (on hover or below)**               |
|------------------|-----------------------------------------------|-----------------------------------------------|
| **Dropdown**     | Material Type                              | Select the base material for the product    |
| **Calendar**     | Requested Delivery Date                     | The date the customer expects delivery     |
| **Checkbox**     | Möchten Sie eine Expresslieferung?          | Auswählen, wenn Expressbearbeitung erforderlic ist.|

![Selection Criteria](/lens-docs/field-structure.png)