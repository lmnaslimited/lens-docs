---
title: Programming Standards - Actions
---

### Highlight selected row
Apply a highlight style to the selected row in the datatable to improve user feedback during interaction.
**Why:**
Visually indicating the selected row helps users track their current context, especially in large datasets. It reduces the chance of taking action on the wrong row and improves overall usability.

**❌ Incorrect way**
```javascript
// No visual feedback when a row is selected
// or using hardcoded CSS without structure
document.querySelector('.dt-cell').style.backgroundColor = '#CFCFCF';
```
**✅ Correct Way**
```javascript
STYLE.innerHTML = `
.dt-row--highlight .dt-cell {
  background-color: var(--dt-selection-highlight-color);  // :white_check_mark: Theme-aware
  background-color: #FFFCE7;  // :white_check_mark: Visual Feedback
}
`;
```
### Avoid Direct DOM Element Access
**Why:**
Directly querying DOM elements (`document.querySelector`) tightly couples logic with specific HTML structure. It breaks when class names or structure change. Prefer abstracted methods or built-in framework features (e.g., filters, column definitions).

**❌ Incorrect way**
```javascript
const ELEMENT = document.querySelector(`.dt-cell__content--header-${i}`);
if (ELEMENT) {
    const TEXT = ELEMENT.innerText;
    laTextArray.push(TEXT);
}
```
**✅ Correct Way**
```Python
def get_user_column_preferences(user):
    doc = frappe.get_doc("User Session Defaults", user)
    return doc.report_columns
```
---
### Avoid Manual DOM-Based Feedback Rendering

**Why:**
Using manual DOM manipulation to show messages can lead to inconsistent UX and make maintenance difficult. It bypasses Frappe's built-in UI mechanisms, which handle context, translation, and styling automatically. Prefer `frappe.show_alert` or `frappe.msgprint` for consistent and localized feedback.

**❌ Incorrect way**
```javascript
// Avoid manual DOM updates or custom alert HTML
if (response.message) {
    const alertBox = document.createElement("div");
    alertBox.className = "custom-alert success";
    alertBox.innerText = "Column Preference Saved";
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 5000);
}
```
**✅ Correct Way**
```javascript
"callback": (response) => {
    if (response.message) {
        frappe.show_alert({
            message: __('Column Preference Saved'),
            indicator: 'green'
        }, 5);
    }
},
"error": (response) => {
    if (response.message) {
        frappe.show_alert({
            message: __('Failed to Save'),
            indicator: 'Red'
        }, 5);
    }
}
```
---
### Avoid Native `confirm()` for User Prompts

**Why:**
Using native `confirm()` dialogs interrupts user flow, lacks styling, and doesn't support translations or callbacks well in Frappe. Prefer `frappe.confirm` to ensure consistent UI/UX, localization, and better callback control.

**❌ Incorrect way**
```javascript
if (confirm("This will Recalculate the Price for the Design again. Do you want to proceed?")) {
    recalculate_price();
}
```
**✅ Correct Way**
```javascript
frappe.confirm(
    __('This will Recalculate the Price for the Design again. Do you want to proceed?'),
    () => {
        recalculate_price();
    }
);
```
---
### Avoid Hardcoding Route Names
**Why:**
Hardcoding route names like `"item"` reduces flexibility and can lead to issues if module structure or naming conventions change. Prefer `frappe.set_route` with `doctype` and dynamic values to ensure maintainability and correctness.

**❌ Incorrect way**
```javascript
function fnViewItem(frm) {
  frappe.set_route("item", frm.doc.item);
}
```
**✅ Correct Way**
```javascript
function fnViewItem(frm) {
  frappe.set_route("Form", "Item", frm.doc.item);
}
```

### Avoid Deeply Nested Conditionals for Field Logic
**Why:**
Deep nesting reduces code readability and makes future changes harder. Prefer flattening logic using guard clauses and helper functions to clarify intent and improve maintainability.

**❌ Incorrect way**
```javascript
item(frm){
    if(!frm.doc.item && frm.doc.status === "Item Created"){
        if(frm.doc.is_design === 1){
            frm.set_value('status', 'Calculation Received');
            frm.save().then(function() {
                fnUpdateButtonGroup(frm);
            });
        }else{
            frm.set_value('status', 'Draft');
            frm.save().then(function() {
                fnUpdateButtonGroup(frm);
            });
        }
    }
}
```
**✅ Correct Way**
```javascript
item(frm) {
    if (frm.doc.item || frm.doc.status !== "Item Created") return;
    const new_status = frm.doc.is_design ? 'Calculation Received' : 'Draft';
    frm.set_value('status', new_status);
    frm.save().then(() => fnUpdateButtonGroup(frm));
}
```

### Avoid Setting Field Options Without Validating Field Existence
**Why:**
Directly setting field properties without checking if the field exists may cause runtime errors, especially in dynamic or conditional forms. Always ensure the field is present before applying `set_df_property`.

**❌ Incorrect way**
```javascript
frm.set_df_property(iAttributeName, 'options', ldAttribute.options);
```
**✅ Correct Way**
```javascript
if (frm.fields_dict[iAttributeName]) {
    frm.set_df_property(iAttributeName, 'options', ldAttribute.options);
}
```

### Avoid Using Unscoped Variables in Conditions
**Why:**
Using undeclared or out-of-scope variables (like `row` in a condition outside its declaration context) can lead to reference errors or unexpected behavior. Always define and scope variables clearly to ensure logical correctness and code clarity.

**❌ Incorrect way**
```javascript
const totalRow = frappe.query_report.data.find(row => row.power === 'Weekly Capacity');
if (row[col] > totalRow[col]) {
    // logic
}
```
**✅ Correct Way**
```javascript
const totalRow = frappe.query_report.data.find(row => row.power === 'Weekly Capacity');
frappe.query_report.data.forEach(row => {
    if (row[col] > totalRow[col]) {
        // logic
    }
});
```

### Avoid Using DOM to Capture Column State After User Customization
**Why:**
Accessing column headers via DOM (`document.querySelector`) to capture user-modified report state is fragile. Instead, use `frappe.query_report.get_visible_columns()` which returns the visible and ordered columns as per user interaction.

**❌ Incorrect way**
```javascript
report.page.add_inner_button(__("Save Columns"), function() {
    for (let i = 0; i <= 69; i++) {
        const CLASSNAME = `dt-cell__content--header-${i}`;
        const ELEMENT = document.querySelector(`.${CLASSNAME}`);
        if (ELEMENT) {
            const TEXT = ELEMENT.innerText;
            laTextArray.push(TEXT);
        }
    }
    // Save laTextArray...
});
```
**✅ Correct Way**
```javascript
report.page.add_inner_button(__("Save Columns"), function () {
    const visibleCols = frappe.query_report.get_visible_columns();
    const laTextArray = visibleCols.map(col => col.label);
    // Save laTextArray to DB or User Defaults...
});
```
----

