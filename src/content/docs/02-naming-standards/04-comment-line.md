---
title: Introduction to Comment Line Standard
---


These guidelines explain **how to write meaningful comments** in your code.  
The goal is **not** to describe what the code does in plain English, but **why** it is written that way, so the next developer understands the purpose and reasoning.

---

## 1. Comment Every Line
- **Rule:** Each line should have a comment — either a **half-line comment** at the end or a **full-line comment** above it.  
- **Purpose:** Helps future developers understand the *reason* for that line.

**❌ Wrong:**

**In python**
```python
la_total_sales = fn_get_sales()  # Get sales
```
**in javscript**
```javascript
const LaTotal = fnGetTotalSales(); // Get total
```

**✅ Right:**

**In python**
```python
# Fetch sales for this quarter to calculate commission
la_total_sales = fn_get_sales()
```
**In javascript**
```javascript
// Fetch total sales for this quarter to validate commission eligibility
const LaTotal = fnGetTotalSales(); 
```
## 2. Explain the Reason, Not the Obvious Action
- **Rule:** Comments should tell why the code is needed or what problem it solves, not just restate the code.
- **Purpose:** The reader already sees what the code does; they need to know the context.

**❌ Wrong:**

**In python**
```python
l_total = 0  # Set total to 0

for l_price in la_item_prices:
    l_total = l_total + l_price  # Add price to total

if l_total > 1000:
    frappe.msgprint("High value order")  # Show message
```
**In javascript**
```javascript
let lTotal = 0; // Set total to 0
//loop through each item prices
for (let lPrice of iaItemPrices) {
    lTotal = lTotal + lPrice; // Add price to total
}
//if total is above 1000 show a message
if (lTotal > 1000) {
    frappe.msgprint("High value order"); // Show message
}
```

**✅ Right:**

**In python**
```python
l_total = 0  # Start from zero so we can accumulate the Sales Order total for validation
#  Add up all item prices so we can validate the Sales Order total before saving
for l_price in la_item_prices:
    l_total = l_total + l_price  # Include the item's price in the grand total for final validation
# We check if the total order value is above $1000 because company policy says such orders need manager approval
if l_total > 1000:
    frappe.msgprint("High value order")  # Tell the user so they can request approval before continuing
```
**In javascript**
```javascript
let lTotal = 0; // Start from zero so we can accumulate the Sales Order total for validation

// Add up all item prices so we can validate the Sales Order total before saving
for (let lPrice of iaItemPrices) {
    lTotal = lTotal + lPrice; // Include the item's price in the grand total for final validation
}
// We check if the total order value is above $1000 because company policy says such orders need manager approval
if (lTotal > 1000) {
    frappe.msgprint("High value order"); // Tell the user so they can request approval before continuing
}
```
## 3. Multiline Function Comments
- **Rule:** Every function must have a multiline comment block above it describing:
        - **Purpose:** What the function does and why it exists
        - **Parameters:** Name, type, purpose
        - **Returns:** Type and meaning
- **Purpose** Makes functions self-explanatory to future readers.
**Common Syntax**
```
"""
Purpose:  <why it exists>
@params:
    <name> (<type>) - <purpose>
Returns:
    <type> - <meaning>
"""
```
**❌ Wrong:**

**In python**
```python
# Calculate total
def fn_calculate_order_total(ia_item_prices):
    l_total = sum(ia_item_prices)
    return l_total
```
**In javascript**
```javascript
// Function to calculate final price
function fnCalculateOrderTotal(iaIemPrices) {
    // initiate a variable to store final price
    let lTotal = 0;
    // Add all prices
    iaIemPrices.forEach(lPrice => lTotal = lTotal + lPrice);
    return lTotal;
}
```
**✅ Right:**

**In python**
```python
"""
Purpose:  Calculate the total price of items in a Sales Order.
          Useful for validating totals before saving the document.

@params:
    item_prices (list[float]) - List of item prices in the Sales Order
Returns:
    float - Sum of all item prices
"""
def fn_calculate_order_total(ia_item_prices):
    l_total = sum(ia_item_prices)  # Add up all prices
    return l_total # Return the total price for all items
```
**In javascript**
```javascript
/*
Purpose:  Calculate the total price of items in a Sales Order.
          Useful for validating totals before saving the document.

@params:
    itemPrices (Array<number>) - List of item prices in the Sales Order
Returns:
    number - Sum of all item prices
*/
function fnCalculateOrderTotal(iaIemPrices) {
    // Start with 0 because we'll accumulate item prices to get total
    let lTotal = 0;
    // Add each item's price to running total so we get the final amount
    iaIemPrices.forEach(lPrice => lTotal = lTotal + lPrice);
    // Return the total price for all items
    return lTotal;
}
```

## 4. Story Reference at the Top of Scripts
- **Rule:** Always add a story/task reference at the top of client scripts and server scripts.
**Common Syntax**
```
Story Reference: US-<YEAR>-<ID>
```

