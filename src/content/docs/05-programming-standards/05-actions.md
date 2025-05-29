---
title: Programming Standards - Actions
---

 ### Highlight selected row
Apply a highlight style to the selected row in the datatable to improve user feedback during interaction.

**Why:**
Visually indicating the selected row helps users track their current context, especially in large datasets. It reduces the chance of taking action on the wrong row and improves overall usability.

**❌ Incorrect Way**
```javascript
// No visual feedback when a row is selected
// or using hardcoded CSS without structure
document.querySelector('.dt-cell').style.backgroundColor = '#cfcfcf';
```

 ✅ Correct Way
```javascript
STYLE.innerHTML = `  
.dt-row--highlight .dt-cell {  
  background-color: var(--dt-selection-highlight-color);  // ✅ Theme-aware  
  background-color: #FFFCE7;  // ✅ Visual Feedback  
}
`;
``` 
### Avoid Direct DOM Element Access

**Why:**  
Directly querying DOM elements (`document.querySelector`) tightly couples logic with specific HTML structure. It breaks when class names or structure change. Prefer abstracted methods or built-in framework features (e.g., filters, column definitions).

**❌ Incorrect Way**
```javascript
const ELEMENT = document.querySelector(`.dt-cell__content--header-${i}`);
if (ELEMENT) {
    const TEXT = ELEMENT.innerText;
    laTextArray.push(TEXT);
}
```

✅ Correct Way
```Python 
def get_user_column_preferences(user):
    doc = frappe.get_doc("User Session Defaults", user)
    return doc.report_columns
```
---
### Enable Row Selection via Checkbox

**Why**
Allows bulk actions and improves usability when interacting with multiple rows.

❌ Incorrect Way
```javascript
// No checkbox column; actions need manual row identification`
```

✅ Correct Way
```javascript
get_datatable_options: function (iOptions) {
  return Object.assign(iOptions, {
    checkboxColumn: true,
  });
}
```
----

