---
title: Cypress - Syntax
---

## To Add a Row in Child Table

* To  add a new `row` in a specific child table within a form using Cypress .
*  Useful when testing tables like `items`.

**Cypress Syntax:**
```javascript
cy.get('[data-fieldname="<child-table-name>"]',{ timeout:10000})
  .should('exist')
  .should('be.visible')
  .within(() => {
    cy.contains('button', 'Add Row', { matchCase: false })
      .should('be.visible')
      .click({ force: true });
  });
  ```
| Parameter            | Type        | Description                                                              |
| -------------------- | ---------------------- | ------------------------------------------------------------------------ |
| `<child-table-name>` | Selector               | Replace The target child table (e.g., `items`)                                   |
| `timeout`            | Cypress Option         | Sets the max wait time (in ms) for an element to appear or be actionable |
| `Add Row`            | Button Text            | The visible label of the button used to add a new row                    |
| `matchCase: false`   | Cypress Option | Enables case-insensitive text matching for `cy.contains()`               |

**Use Case:**  
Add a new row to the `items` child table:

```javascript
cy.get('[data-fieldname="items"]', { timeout: 10000 })
  .should('exist')
  .should('be.visible')
  .within(() => {
    cy.contains('button', 'Add Row', { matchCase: false })
      .should('be.visible')
      .click({ force: true });
  });
  ```

**Output:**  
A new empty row will be inserted into the `items` table, ready for user input or further validation.

**Note:**

> Using  `{ force: true }` ensures the action proceeds even if the button isn't fully interactable.

---


## To Access and Verify Date Field in a Form 

*  To Validate the value of a date field in a lens using Cypress.
* Useful to ensure the correct date is displayed or pre-filled as expected.

**Cypress Syntax:**
```javascript
cy.get('<selector>').should('have.value', '<date>')
```
| Parameter    | Type| Description                                                    |
| ------------ | -------------- | -------------------------------------------------------------- |
| `<selector>` | Selector       | The CSS selector or test ID targeting the date input field     |
| `<date>`     | Expected Value | The value you expect the field to have, in `DD-MM-YYYY` format |


**Use Cases:**
Check that a date input with ID `delivey-date` has the value `28-05-2025`:

```javascript
cy.get('#delivery-date').should('have.value', '28-05-2025')
```
**Output:**
If the date matches:
```
✓ Assertion Passed: expected '<input#delivery-date>'  to have value '2025-05-28'
```

**Note:**

> Use `.should('have.value')` instead, as the text inside input fields is stored in the `value` attribute, not as inner text.

---

## To Validate a Select Field in a Form

-   Checks the selected value of a dropdown (`<select>`) field in a form.
-   Useful for confirming that the correct option is pre-selected or set by user.

**Cypress Syntax:**
```javascript
cy.get(`[data-fieldname="<field-name>"]:visible select`)
  .should('have.value','<expected_value>');
  ```
| Parameter                         | Type  | Description                                                  |
| --------------------------------- | -------------- | ------------------------------------------------------------ |
| `[data-fieldname="<field-name>"]` | Selector       | Replace `<field-name>` with the actual field you want to validate   |
| `:visible`                        | jQuery Filter  | Ensures the element is currently visible in the DOM          |
| `select`                          | HTML Element   | Selects the `<select>` dropdown element inside the container |


**Use Case:**
To Validate that the **`order_type`** select field in the form has the value `"Sales"` selected:
```javascript
cy.get('[data-fieldname="order_type"]:visible select')
  .should('have.value', 'Sales');
  ```

**Output:**  
If the dropdown's selected value is `"Sales"`:
```Assertion Passed: expected '<select>'  to have value 'Sales'```

**Note:**

> The selector `:visible select` is specifically used to target visible dropdown (`<select>`) elements, ensuring Cypress interacts  with select fields.

---

## To Access Edit Details in Child Tables 

* To open the edit details in a child table for a specific row index using Cypress.
* Useful for testing table rows and their editable sections.

**Cypress Syntax:**
```javascript
cy.get('[data-fieldname="<table_name>"] .grid-body .grid-row')
  .eq(<rowIndex>)
  .within(() => {
    cy.get('.btn-open-row').first().click({ force: true });
  });
```
| Parameter              | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `<table_name>`         | Replace with the `table_name` of the child table you want to access/edit details for                |
| `.grid-body .grid-row` | Targets all rows within the table body                                     |
| `.eq(<rowIndex>)`      | Specify the index (starting from 0) of the row you want to interact with |
| `.btn-open-row`        | The button that opens the edit section of the row                          |

**Use Cases:**  
Open the edit details for the first row in the child table under the `items` field:
```javascript
cy.get('[data-fieldname="items"] .grid-body .grid-row')
  .eq(0)
  .within(() => {
    cy.get('.btn-open-row').first().click({ force: true });
  });
```
**Output:**  
Edit section opened for row 0 in the 'items' table

---

## To Expand a Collapsed Section 

* Automatically expands a specific collapsed section in a form or page.
 * Ensures that hidden fileds becomes accessible for further testing.
    
**Cypress Syntax:**
```javascript
// Iterate over each section header
cy.get('.section-head').each(($el) => {
  // Check if the current section's text matches the target section name
  if (Cypress.$($el).text().trim() === '<section_name>') {
    // Check if the section body is currently collapsed (not visible)
    if (Cypress.$($el).parent().find('.section-body').css('display') === 'none') {
      // If collapsed click to expand the section
      cy.wrap($el).click({ force: true });
    }
  }]
});
```
| Parameter        | Type / Used In | Description                                                                     |
| ---------------- | -------------- | ------------------------------------------------------------------------------- |
| `<section_name>` | Selector         | Replace title of the section you want to expand (e.g., `"Currency and Price List"`) |
| `.section-head`  | Selector       | The selector used for section headers                                           |
| `.section-body`  | Selector       | The collapsible content container for each section                              |



**Use Case:**  
Expand the "Currency and Price List" section if it's collapsed:
```javascript
cy.get('.section-head').each(($el) => {
    if (Cypress.$($el).text().trim() === 'Currency and Price List') {
     if (Cypress.$($el).parent().find('.section-body').css('display') ==='none') {
      cy.wrap($el).wait(500).click({ force: true });
    }
  }
});
```
**Output:**  
If the section is collapsed: The 'Currency and Price List' section will be expanded and made visible.

---

## Validating Mandatory Fields in a Form 

*  Used to verify whether a field is marked as **required** in a form.
*   Ensures business-critical fields like `Customer`, `Item`, etc., are properly enforced by the form configuration.

**Cypress Syntax:**

```javascript
cy.get(`[data-fieldname="<field_name>"]`)
  .find(".control-label.reqd")
  .should("exist");
 ```
| Parameter             | Type / Used In | Description                                             |
| --------------------- | -------------- | ------------------------------------------------------- |
| `<field_name>`        | Selector         | Repalce name of the mandatory field to validate             |
| `.control-label.reqd` | Selector       | Selector that indicates the label is marked as required |

**Use Case:**  
Check if the `customer` field is mandatory in the **Sales Order** form:

```javascript
cy.get(`[data-fieldname="customer"]`)
  .find(".control-label.reqd")
  .should("exist");
  ``` 

**Output:**
`✓ Mandatory label is present for field: customer` 

**Note:**
> The `.control-label.reqd` class is automatically added by the framework when a field is marked as required. 

---

## To Navigate Between Tabs 

-  To switch between tabs in a multi-tab form interface.
-   Useful for verifying content  in non-default tabs.

**Cypress Syntax:**
```javascript
cy.get('.form-tabs .nav-item a')
  .filter(`:contains("<tab-name>")`)
  .first()
  .click({ force: true });
```
| Parameter                 | Type  | Description                                                                   |
| ------------------------- | --------------- | ----------------------------------------------------------------------------- |
| `.form-tabs .nav-item a`  | Selector        | Selector targeting all tab links                                              |
| `:contains("<tab-name>")` | jQuery Filter   | Replace `<tab-name>` with the **exact name of the tab** (e.g., `"More Info"`) |
| `.first()`                | Cypress Command | Clicks the first matching tab link                                            |


**Use Case:**  
Navigate to the **"More Info"** tab in a form:

```javascript
cy.get('.form-tabs .nav-item a')
  .filter(`:contains("More Info")`)
  .first()
  .click({ force: true });
```
**Output:**
 Switched to the 'More Info' tab .
 
 ---

 ## To Validate Readonly Fields in a Form 

-   Checks the value of readonly (non-editable) fields in a form.
-   Useful for verifying that certain fields display correct data but cannot be edited.

**Cypress Syntax:**
```javascript
cy.get(`[data-fieldname="${field_name}"] > .form-group > .control-input-wrapper > .control-value`)
  .should('have.text', '<expected_text>');
  ```
| Parameter                                               | Type  | Description                                                            |
| ------------------------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| `[data-fieldname="<field_name>"]`                       | Selector       | Replace `<field_name>` with the actual field name you want to validate |
| `.form-group > .control-input-wrapper > .control-value` | Selector       | Selector used specifically for readonly (non-editable) fields          |



**Use Case:**  
Validate that the readonly field `customer_name` displays `"ABB AG"`:
```javascript
cy.get('[data-fieldname="customer_name"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', 'ABB AG');
  ```
  **Output:**  
If the readonly field shows the expected text:
```✓ Assertion Passed: expected element to have text  'ABB AG'```

---
## Difference Between `have.value` and `have.text` in  Assertions
 You can assert values using `.should('have.value')` or `.should('have.text')` depending on the type of HTML element you're targeting.

 `.should('have.value'):`
-  **Used for**: Form elements like `<input>`, `<textarea>`, and `<select>`
- **Checks**: The value **inside the `value` attribute** of the element.

**Example:**
```javascript
cy.get('[data-fieldname="transaction_date"] input:visible')
  .should('have.value', '25-05-2025');
```
**Output:**
```
Passes if the date input field holds `25-05-2025` in the `value` attribute.
```

`.should('have.text'):`
-   **Used for**: Display elements like `<div>`, `<span>`, `<p>`, or custom read-only fields
-   **Checks**: The **visible inner text** of the element .

**Example:**
```javascript
cy.get('[data-fieldname="status"] .control-value')
  .should('have.text', 'Submitted');
```
**Output:**
```
Passes if the visible text content inside the field is `Submitted`.
```

**Note**:  
>If you're unsure whether to use `.value` or `.text`, inspect the element in the browser — if it has a `value` attribute (like `<input value="xyz">`), use `.have.value`. Otherwise, if it's just displayed text (like `<div>xyz</div>`), use `.have.text`.

---