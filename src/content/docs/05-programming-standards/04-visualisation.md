---
title: Programming Standards - Visualization
---

# Visualisation

### Define Column width
Set an explicit width for each column to ensure consistent layout and prevent unpredictable wrapping or overflow.
**Why:**  
Defining column width improves readability, maintains alignment across rows, and ensures a uniform appearance — especially in wide reports or when exporting to PDF/Excel. It also helps prevent labels or values from overlapping into adjacent columns.
```python
 la_columns = [
        {
            "fieldname": "weekly_capacity",
            "label": _("Weekly Capacity"),
            "fieldtype": "Int",
            "width": 50,// ✅ Correct Way
        },
    ]
``` 
### Static Key Column
 Key columns (e.g., primary identifiers) should remain fixed when scrolling horizontally.
**Why:**
Keeping key columns static ensures users always retain context while scrolling through wide tables. Without this, it becomes difficult to associate data in far-right columns with their respective rows, increasing the risk of misinterpretation and user error.
```javascript
L_STYLE.innerHTML = `
.dt-instance-1 .dt-cell--col-0 {
        display: flex;
        text-align: right;    // ❌ Incorrect way
        z-index: 2;
        left: 0px; /* Adjust this value to match the width of col-1 */
    },
     .dt-instance-1 .dt-cell--col-1 {
        display: flex;
        text-align: right;
        position: sticky;    // ✅ Correct Way
        z-index: 2;
        left: 30px; /* Adjust this value to match the width of col-1 */
    }`;
```
### Use Charts for Large Datasets
Use visual summaries (charts) when the dataset exceeds a manageable number of rows or when trends are more important than individual records.
**Why:**  
Charts help users grasp patterns, exceptions, and trends quickly — especially when tabular data grows too large to scan efficiently.
```python
 la_columns = [
        {
            "fieldname": "weekly_capacity",
            "label": _("Weekly Capacity"),
            "fieldtype": "Int",
            "width": 50,// ✅ Correct Way
        },
    ]
``` 
### Avoid break in label
Use single-line, non-breaking labels for fields to maintain visual consistency and avoid misalignment in report headers.
**Why:**
Line breaks (`<br>`) in labels cause uneven row heights, cluttered headers, and poor alignment — especially when exporting or rendering in tight layouts. Use CSS styles to manage label overflow gracefully.
**❌ Incorrect Way**
```python
{"fieldname": "sales_order", 
"label": _("Sales<br>Order"), //❌ Incorrect Way
"fieldtype": "Link",
 "options": "Sales Order",
 "width": 140},
```
 ✅ Correct Way
```python
 {  
"fieldname": "sales_order",  
"label": __("Sales Order"), // ✅ Correct Way
"fieldtype": "Link",  
"options": "Sales Order",  
"width": 140,  
"label_style": "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"  // ✅ Correct Way
}
``` 
### Enable rows checkbox
Use checkboxes to allow selection of multiple rows in a report, enabling batch actions or easier comparisons.
**Why:**  
Enabling row checkboxes improves usability for tasks that require selecting multiple entries (e.g., bulk processing, exporting, linking). It provides a familiar and intuitive UI pattern, especially for users dealing with large datasets.
 ✅ Correct Way
```javascript
  get_datatable_options: function (iOptions) {    // ✅ Correct Way
    return Object.assign(iOptions, {
      checkboxColumn: true,
    });
  },
 ```