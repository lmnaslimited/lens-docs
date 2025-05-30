---
title: Programming Standards - Visualization
---
# Visualisation

### Define Column width

Set an explicit width for each column to ensure consistent layout and prevent unpredictable wrapping or overflow.

**Why:**  
Prevents layout shifts and wrapping in table columns.

**❌ Incorrect way**
```python
 la_columns = [
        {
            "fieldname": "weekly_capacity",
            "label": _("Weekly Capacity"),
            "fieldtype": "Int",
        },
    ]
``` 

**✅ Correct Way**
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
---
### Static Key Column
 Key columns (e.g., primary identifiers) should remain fixed when scrolling horizontally.

**Why:**
Keeping key columns static ensures users retain context while scrolling, preventing misinterpretation of data in wide tables.

**❌ Incorrect way**
```javascript
L_STYLE.innerHTML = `
.dt-instance-1 .dt-cell--col-0 {
        display: flex;
        text-align: right;   
        z-index: 2;
        left: 0px; /* Adjust this value to match the width of col-1 */
    },
```

**✅ Correct Way**
```javascript
L_STYLE.innerHTML = `
.dt-instance-1 .dt-cell--col-0 {
        display: flex;
        text-align: right;
        position: sticky;    // ✅ Correct Way
        z-index: 2;
        left: 30px; /* Adjust this value to match the width of col-1 */
    }`;
```
---
### Mandatory Fields Should Have Default Values

**Why:** Prevents empty report load and improves user experience.

**❌ Incorrect way**
```javascript
{
  "fieldname": "from_date",
  "label": __("From Date"),
  "fieldtype": "Date",
  "required": 1
}
```

**✅ Correct Way**
 ```javascript
{
  "fieldname": "from_date",
  "label": __("From Date"),
  "fieldtype": "Date",
  "required": 1,
  "default": frappe.datetime.month_start()    //✅ Correct Way
}
```
---
### Use Charts for Large Datasets
Use visual summaries (charts) when the dataset exceeds a manageable number of rows or when trends are more important than individual records.

**Why:**  
Charts help users grasp patterns, exceptions, and trends quickly — especially when tabular data grows too large to scan efficiently.

 ✅ Correct Way
```python

``` 
---
### Avoid break in label
Use single-line, non-breaking labels for fields to maintain visual consistency and avoid misalignment in report headers.

**Why:**
Multi-line labels reduce readability and cause inconsistent UI.

**❌ Incorrect Way**
```python
{
"fieldname": "sales_order", 
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
----
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

 ### Use Meaningful Colors in Charts

Apply distinct, consistent colors to represent categories or metrics in charts.

**Why:**  
Color helps users quickly differentiate data series and understand visual trends. Using random or similar colors confuses interpretation, especially in stacked or multi-series charts.

 ✅ Correct Way
```javascript
colors: ["#1abc9c", "#e74c3c", "#3498db", "#f39c12"]
```
---

### Apply Conditional Formatting for Threshold Violations

**Why:** Visually alerts users when values exceed limits like weekly capacity.

**❌ Incorrect Way**
```javascript
if (idData[col] > weekly_capacity) {
  // no formatting
}
```
 **✅ Correct Way**
```javascript
if (idData[idColumn.fieldname] > idData["weekly_capacity"]) {
  $lValue.addClass("bg-danger text-white");
}
```
### Set Chart Height Explicitly

**Why:** Prevents layout issues and ensures consistent chart visibility.

**❌ Incorrect Way**
```javascript
svg.frappe-chart.chart {
  /* no height set */
}
```
**✅ Correct Way**
```javascript
svg.frappe-chart.chart {
  height: 320px;
}
```
### Customize Tooltip for Better Readability
**Why:** Improves clarity in charts by preventing tooltip overflow and misalignment.

**❌ Incorrect Way**
```javascript
.graph-svg-tip.comparison {
  /* default styles lead to overflow or misalignment */
}
```
**✅ Correct Way**
```javascript
.graph-svg-tip.comparison {
  text-align: left;
  padding: 0px;
  pointer-events: none;
  top: -130px !important;
  width: 350px !important;
}
```

 ---

