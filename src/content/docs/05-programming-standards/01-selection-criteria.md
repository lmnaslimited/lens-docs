---
title: Programming Standards - Selection Criteria
---

## Field Representation & Type Appropriateness

**Use Case:** A sales engineer is trying to find a specific quotation using the **Quotation Report** by specifying parameters such as Material Type, Quotation Date, and Express Delivery. 

**Standards:**

-   Field must have a label
    
-   Internationalization support (`label: __("...")`)
    
-   Use tooltips or descriptions
    
-   Choose appropriate fieldtype
    
        
**Description**

- Labels should clearly describe what the field is for, and tooltips or descriptions should offer quick guidance. 
- Use `__()` to translate labels and descriptions if the customer uses a specific language.
-   Match field types to the data: use `Date` for dates, `Check` for true/false, and `Select` for fixed options etc...
- Avoid using the generic `Data` type when a more specific one is available.    

 **❌ Incorrect Way**

```js
filters: [
  {
    fieldname: "material",
    fieldtype: "Data",  // Should be select type using generic data type
    label: "",          // No label
    // Missing translation: label and description should use __("...")
  },
  {
    fieldname: "delivery",
    fieldtype: "Data",  // should be date type 
    // No tooltip or description
  }
]
```

 **✅ Correct Way**

```js
filters: [
  {
    fieldname: "material_type",
    fieldtype: "Select", // Using appropriate fieldtype
    label: "Material Type", // Clear label
    options: ["Aluminium", "Steel", "Brass"], // Specific options
    description: "Select the base material for the product", // Helpful text
  },
  {
    fieldname: "delivery_date",
    fieldtype: "Date", // Proper type
    label: "Requested Delivery Date",
    description: "The date customer expects delivery",
  },
  {
    fieldname: "express_delivery", 
    fieldtype: "Check", // Not using generic 'Data'
	label: __("Express Delivery?"), // Translatable label
    description: __("Tick if express processing is required")
  }
]

```

**Output**

User sees a clearly structured form:

-   **Material Type** dropdown with options
    
-   **Calendar picker** for delivery date
    
-   **Checkbox** for express delivery option 

![Selection Criteria](/lens-docs/field-structure.png)