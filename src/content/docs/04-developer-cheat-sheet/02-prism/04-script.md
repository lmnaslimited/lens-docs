---
title: PRISM - Script
---
# Client Side

# Using ''frappe.call'' with Various Built-in Methods 

## Using `frappe.call` in Frappe Javascript
* Used to call backend (Python) methods from frontend (JavaScript)
* Commonly used for accessing and updating data from the doctypes.

**Command Syntax**

```javascript
frappe.call({
    method: "<method_path>",
    args: {
        <arg_key>: <arg_value> 
    },
    callback: function(ldResponse) {
        console.log(ldResponse.message);
    }
})
```

### Using the frappe.client.get method with `frappe.call` – Fetch Full Document

* Used to get a complete document using its name. 
* Helpful when you need all fields including child tables


**Command Syntax**

```js
frappe.call({
    method: "frappe.client.get",
    args: {
        doctype: "<doctype_name>",
        name: "<doctype_id>"
    },
    callback: function(r) {
        console.log(r.message);
    }
});
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `doctype`  |  string  |  Doctype Name ("Sales Order")       |
| `name`  |  string  |  Document ID ("SAL-ORD-2025-00015")       |

**Common Patterns or Use Cases**

```js
frappe.call({
    method: "frappe.client.get",
    args: {
        doctype: "Sales Order",
        name: "SAL-ORD-2025-00015"
    },
    callback: function(ldResponse) {
        if(ldResponse.message) {
            const ldDoc = ldResponse.message;
            console.log("Customer:", ldDococ.customer);
            console.log("Status:", ldDoc.status);
            console.log("Items:", ldDoc.items);
        } 
    }
});

```
**Sample Output :**
```
{
    "name": "SAL-ORD-2025-00015",
    "customer": "ABB AG",
    "status": "To Deliver",
    "items": [
        {
            "item_code": "DTTHZ2N 1200/10/400/6/75",
            "qty": 1,
            "rate": 10000
        }
    ]
}
```
---
### **Using `frappe.client.get_list` with `frappe.call` – Fetch Filtered List of Documents with Specific Fields**

-   `frappe.client.get_list` is used to retrieve a list of documents from a specific Doctype based on filters.
- You can specify **which fields to return** and **which records to include** using filters.


**Command Syntax**

```js
frappe.call({
    method: "frappe.client.get_list",
    args: {
        doctype: "<doctype_name>",
        filters: { <field_name>: <value> },
        fields: ["<field_name1>", "<field_name2>"]
    },
    callback: function(r) {
        console.log(r.message);
    }
});
```

**Parameters & Options**
| Parameter | Type   | Description                                                                               |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| `doctype` | string |  Doctype (e.g., `"Sales Order"`)                                           |
| `filters` | object | Conditions to filter documents (e.g., `{ "status": "Draft" }`)                            |
| `fields`  | array  | Specific fields to return from the matching documents (e.g., `["name", "customer_name"]`) |

**Common Patterns or Use Cases**

```js
frappe.call({
    method: "frappe.client.get_list",
    args: {
        doctype: "Sales Order",
        filters: { "name": "SAL-ORD-2025-00015" },
        fields: ["customer_name"]
    },
    callback: function(ldResponse) {
        if (ldResponse.message) {
            const lCustomer = ldResponse.message;
            console.log("Customer:", lCustomer);
        } 
    }
});

```
**Sample Output :**
```
Customer: [{ customer_name: "Global" }]
```
---

### Using the frappe.client.get_value method with `frappe.call` – Fetch Specific field

* Used to retrieve only selected fields 
* Lightweight and faster for quick lookups


**Command Syntax**

```js
frappe.call({
    method: "frappe.client.get_value",
    args: {
        doctype: "<doctype_name>",
        filters: { name: "<doctype_id>" },
        fieldname: ["<field_1>", "<field_2>"]
    },
    callback: function(ldResponse) {
        console.log(ldResponse.message);
    }
});
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `doctype`  |  string  |  Doctype Name ("Sales Order")       |
| `filters`  |  object  |  Field-value pairs       |
| `fields`  |  string/array  |  One or More fields     |

**Common Patterns or Use Cases**

Fetching only specific fields (e.g. customer, transaction_date)

```js
frappe.call({
    method: "frappe.client.get_value",
    args: {
        doctype: "Sales Order",
        filters: { name: "SAL-ORD-2025-00015" } 
        fieldname: ["customer", "transaction_date"]
    },
    callback: function(ldResponse) {
        if(ldResponse.message) {
            const ldDoc = ldResponse.message;
            console.log("Customer:", ldDococ.customer);
            console.log("Transaction Date:", ldDoc.transaction_date);
        } 
    }
});

```
**Sample Output :**
```
{
    "customer": "ABB AG",
    "transaction_date": "2025-05-28"
}
```

### Using the frappe.db.get_value method – Fetch Specific Field(s) without fetching full document

* Used to retrieve only selected fields from a document.
* Lightweight and faster for quick lookups


**Command Syntax**

```js
frappe.db.get_value(doctype, filters, fieldname, callback);
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `doctype`  |  string  |  Doctype Name ("Sales Order")       |
| `filters`  |  object  |  Field-value pairs       |
| `fields`  |  string/array  |  One or More fields     |
| `callback`  |  function  |  process the response     |

**Common Patterns or Use Cases**

Fetching only specific fields (e.g. customer, transaction_date)

```js
frappe.db.get_value(
    "Sales Order",
    { name: "SAL-ORD-2025-00015" },
    ["customer", "transaction_date"],
    function(ldResponse) {
        if (ldResponse.message) {
            const ldDoc = ldResponse.message;
            console.log("Customer:", ldDoc.customer);
            console.log("Transaction Date:", ldDoc.transaction_date);
        } 
    }
);

```
**Sample Output :**
```
{
    "customer": "ABB AG",
    "transaction_date": "2025-05-28"
}
```

### Using `frm.call` – Call Server-Side API Method from Client-Side
* Used to call a Python API method from the client-side script.
* Allows real-time interaction with backend logic, fetching data, or performing operations.

**Command Syntax**

```js
frm.call({
    method: "method.path", //api name: get_quote_from_salesorder
    args: {
        key1: value1,
        key2: value2
    },
    callback: function(ldResponse) {
        // handle response
    }
});
``` 

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `method`  |  string  |  API method name (server-side script)     |
| `args`  |  object  |  Arguments as key-value pairs       |
| `callback`  |  function  |  response is received from the server     |

**Common Patterns or Use Cases**
```js
frm.call({
    method: "get_quote_from_salesorder", // API method name
    args: {
        source_name: frm.doc.name 
    },
    callback: function(ldResponse) {
        if (ldResponse.message) {
            //code here
        }
    }
});
```

### Using frappe.set_intro – Display an Introductory Message in a Form
* Shows a small descriptive message at the top of the form.
* Helps provide guidance or context to users filling the form.


**Command Syntax**

```js
frappe.set_intro(message);
```

**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| message  |  string  |  Displaying text       |


**Common Patterns or Use Cases**

```js
frappe.ui.form.on('Sales Order', {
    onload: function(frm) {
        frm.set_intro("Set Intro at Top in Sales Order");
    }
});
```

**Sample Output :**
![alt text](/lens-docs/set_intro.png)


### Using frappe.df.set_property – Set Properties Dynamically on DocField in a Form
* Modify field properties such as reqd (mandatory), read_only, hidden, etc., dynamically.


**Command Syntax**

```js
frappe.df.set_property(fieldname, property, value, frm);
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| fieldname  |  string  |  Fieldname      |
| property  |  string  |  Property to set (e.g., "reqd", "hidden")     |
| value  |  boolean  |  0 or 1    |
| frm  |  object  |  Form object (usually passed as frm)    |


**Common Patterns or Use Cases**

```js
frappe.ui.form.on('Sales Order', {
    onload: function(frm) {
        if (frm.doc.custom_factory === 'SGBCZ') {
            frm.set_df_property('custom_factory', 'reqd', 1);
        } else {
            frm.set_df_property('custom_factory', 'reqd', 0);
        }
    }
});
```

**Sample Output :**
![alt text](/lens-docs/mandatory.png)


### Using `frm.set_value` – Set a Field Value in the Form
* Used to set or update the value of a field programmatically.
* Triggers related events like `on_change`, validation, and linked field logic.

**Command Syntax**

```js
frm.set_value(fieldname, value);
```
or

```js
frm.set_value({
    fieldname1: value1,
    fieldname2: value2
});
```

**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| fieldname  |  string  |  Name of the field to update       |
| value  |  any  |  New value to set for the field       |

*Common Patterns or Use Cases*
```js
frappe.ui.form.on('Quotation', {
    refresh: function(frm) {
        frm.set_value('project_name', 'Test Set Value');
        //or
        frm.set_value({
            party_name: "ABC Corp",
            company: "LMNAs Cloud Solutions" //hidden field
        });
    }
});
```
**Sample Output :**
![alt text](/lens-docs/set_value.png)

### Using `add_fetch` – Auto Fetch Field Value from Linked Doctype
* Automatically pulls a value from a linked document's field and sets it in the current form.
* Used in `frappe.ui.form.on()` to map one field to another when a link field is selected.

**Command Syntax**

```js
frm.add_fetch(link_field, source_fieldname, target_fieldname);
```
**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| link_field  |  string  |  Link field in the form       |
| source_fieldname  |  string  |  Field to fetch from the linked doctype       |
| target_fieldname  |  string  |  Field in the current form to set the value       |

**Common Patterns or Use Cases**
```js
frappe.ui.form.on('Quotation', {
    customer(frm) {
        frm.add_fetch('party_name', 'll_packaging', 'packaging');
    }
});
```
**Sample Output :**
![alt text](/lens-docs/add_fetch.png)

### Using `get_query` – Filter Link Field Options Dynamically (Field-Level)
* Used to define dynamic filters for Link fields at the field level.
* Placed inside `frappe.ui.form.on()` for the specific field.
* Returns filter conditions for dropdown value

**Common Syntax**
```js
frm.fields_dict[fieldname].get_query = function(doc) {
    return {
        filters: {
            key: value
        }
    };
};
```
**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| fieldname  |  string  |  Name of the Link field to filter       |
| doc  |  object  |  Current form document context (frm.doc)       |
| filters  |  object  |  Key-value pairs used to filter link options       |

**Common Patterns or Use Cases**
```js
frm.fields_dict['item_code'].get_query = function(doc) {
    return {
        filters: {
            item_group: doc.item_group //item_group: 'DTTHZ2N'
        }
    };
};
```
### Using `set_query` – Filter Link Field Options Dynamically (Global or Field-Level)

* Used to apply dynamic filters to Link fields.
* Can be used for fields in the main form or in child tables.
* More flexible than `get_query`.

---

### Common Syntax

```js
frm.set_query(fieldname, doctype, function(doc) {
    return {
        filters: {
            key: value
        }
    };
});
```
**Common Patterns or Use Cases**
```js
# Syntax for Parent form field
frappe.ui.form.on('Sales Order', {
    setup: function(frm) {
        frm.set_query('customer', null, function(doc) {
            return {
                filters: {
                    customer_group: 'Commercial'
                }
            };
        });
    }
});
```
```js
// Syntax for Child form field
frappe.ui.form.on('Sales Order', {
    setup: function(frm) {
        frm.set_query('item_code', 'items', function(doc) {
            return {
                filters: {
                    item_group: 'DTTHZ2N'
                }
            };
        });
    }
});
```
**Best Practice**
* Use set_query in the setup event.
* Use get_query only if you want to write the filter directly on the field.
* Avoid hardcoding values unless they are fixed.

### Using `frappe.model.with_doc` – Access a Full Document in the Client Script
* `frappe.model.with_doc` is used to **fetch and access the complete document** from the database by specifying its **doctype** and **name**.
* Useful when you want to **use values from another document** that is not currently open in the form.


**Command Syntax**

```js
frappe.model.with_doc(doctype, name).then(doc => {
    // code here
});
```
**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| doctype  |  string  |  Name of the Doctype to fetch      |
| name  |  string  |  The unique name (ID) of the document       |

**Common Patterns or Use Cases**
```js
frappe.ui.form.on('Quotation', {
    onload: function(frm) {
        if (frm.doc.party_name) {
            frappe.model.with_doc('Customer', frm.doc.party_name).then(ldCustomerDoc => {
                frappe.msgprint(`Customer Territory: ${ldCustomerDoc.territory}`);
            });
        }
    }
});
```
**Sample Output :**
![alt text](/lens-docs/msg_print.png)

### Using `frappe.model.set_value` – Set the Value of a Field in a Child Doctype Row

- Sets or updates the value of a specific field in a child table row.
- Useful for dynamically updating fields inside child tables based on conditions or user input.

## Command Syntax

```js
frappe.model.set_value(doctype, docname, fieldname, value);
```

**Parameters & Options**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| doctype  |  string  |  Name of the Child DocType      |
| docname  |  string  |  Name of the child document (child row)       |
| fieldname  |  string  |  Field name whose value you want to set      |
| value  |  any  |  The value to set for the field      |

**Common Patterns or Use Cases**
```js
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        // Set the 'status' field to 'Draft' on form refresh
        frappe.model.set_value(frm.doc.doctype, frm.doc.name, 'status', 'Draft');

        // Set rate of first item in items table to 1000
        if (frm.doc.items && frm.doc.items.length > 0) {
            let ld_first_item = frm.doc.items[0];
            frappe.model.set_value(ld_first_item.doctype, ld_first_item.name, 'rate', 1000);
        }
    }
});
```
## Using HTML Templates in JavaScript – Render Dynamic HTML with JS
- Helps inject structured HTML layouts (like tables, cards, alerts) dynamically in Frappe forms or pages.
- Useful for rendering data-driven UI like logs, summaries, or visual indicators.

**Pre-requiste**
You need to have a field of type HTML

## Command Syntax

```js
const ldTemplate = `<div>...</div>`;
frappe.render_template(ldTemplate, { key: value });
```
**Parameters & Options**
| Parameter  | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| `template` | `string` | Inline HTML template string using Jinja-style tags |
|  `key`     |  `string`| Name of the param object used in the template      |
| `value`     | `object` | Context variables used for rendering the template (parameter used in the jinja)  |

**Notes & Best Practices**

- Frappe uses a **microtemplate engine**, not full Jinja — it’s based on **John Resig’s lightweight JavaScript templating system**, commonly referred to as *Resig-style templates*.
- Loops and variables must follow **Frappe’s JS microtemplate syntax**:
  - Use `{% for(var i = 0; i < array.length; i++) { %}` for loops  
  - Use `{%= array[i].field %}` to render values
- **Standard Jinja syntax** like `{% for item in items %}` is **not supported** in client scripts and will not work.
- Avoid using **single quotes `'`** inside the HTML template string — always use **double quotes `"`** to avoid syntax issues.
- It's best practice to set rendered HTML using:
  ```js
  frm.set_df_property("fieldname", "options", html);
  frm.refresh_field("fieldname");
  ```

**Common Patterns or Use Cases**

Show a visual summary of lead or opportunity status transitions (e.g., Open → Contacted → Quoted), helping users quickly understand progress.
```js
frappe.ui.form.on('Lead', {
    onload(frm) {
        const laStatusLog = [
            {
                status_from: "Open",
                status_to: "Contacted",
                timestamp: "2025-06-01 10:00:00",
                duration: "2 days"
            },
            {
                status_from: "Contacted",
                status_to: "Quoted",
                timestamp: "2025-06-03 15:30:00",
                duration: "1 day 5 hrs"
            }
        ];

        const ldTimelineTemplate = `
           <div class="form-grid-container">
            <div class="form-grid">
                <div class="grid-heading-row">
                    <div class="grid-row">
                        <div class="data-row row">
                            <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">Status From</div></div>
                            <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">Status To</div></div>
                            <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">Timestamp</div></div>
                            <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">Time Difference</div></div>
                        </div>
                    </div>
                </div>
                <div class="grid-body">
                    <div class="rows">
                        {% for(var i = 0; i < status_log.length; i++) { %}
                            <div class="grid-row">
                                <div class="data-row row">
                                    <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">{%= status_log[i].status_from %}</div></div>
                                    <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">{%= status_log[i].status_to %}</div></div>
                                    <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">{%= status_log[i].timestamp %}</div></div>
                                    <div class="col grid-static-col col-xs-3"><div class="static-area ellipsis">{%= status_log[i].duration %}</div></div>
                                </div>
                            </div>
                        {% } %}
                        {% if (!status_log.length) { %}
                            <div class="grid-row">
                                <div class="data-row row">
                                    <div class="col text-muted" colspan="4">No status log found.</div>
                                </div>
                            </div>
                        {% } %}
                    </div>
                </div>
            </div>
        </div>
        `;

        const ldHtml = frappe.render_template(ldTimelineTemplate, { status_log: laStatusLog });
        frm.set_df_property("custom_html_field", "options", ldHtml )
        frm.refresh_field('custom_html_field');
    }
});
```
**Sample Output :**
![alt text](/lens-docs/render_html.png)

## JavaScript Array Methods

### 1. forEach() – Loop through Sales Order Items
**Description**: Iterates over each item in the items array and performs an operation (e.g. log details or compute amount).

**Common Syntax**
```
laArray.forEach(function(ldItem, lIndex) {
		//code here
});
```

**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| ldItem  |  object  |  current item from the array       |
| lIndex  |  number  |  Index of the current item       |


**Use Cases**

A company sells equipment, and each item in a Sales Order Item has its qty. We want to calculate the total qty of all items and show it in a custom field total_qty on the Sales Order form.

We will use forEach() to iterate over the items table and add up the individual warranty months.

```
let lTotalQty = 0;

frm.doc.items.forEach(ldItem => {
    if (ldItem.qty) {
        lTotalQty = lTotalQty + ldItem.qty;
    }
});

// Set the total in a custom field on the main form
frm.set_value('total_qty', lTotalQty);
```

### 2. map() – Transform Sales Order Items

**Description**: Returns a new array by transforming each item in the list (e.g. extract item codes).

**Common Syntax**
```
const laResult = laArray.map(function(ldItem) {
    return transformedValue;
});
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| ldItem  |  object  |  current item from the array       |

**Use Cases**

You want to list all item_codes from the sales order to display in a summary section.

```
const LAitemCodes = salesOrder.items.map(function(ldItem) {
    return ldItem.item_code;
});
console.log("Item Codes:", LAitemCodes);
```
**Sample Output**
```
Item Codes: ["DTTHZ2N 1200/10/400/6/75", "DTTHZ2N 800/10/400/6/50"]
```

### 3.find() – Find First Matching Item

**Description**: Returns the first item that matches a condition (e.g. first bulk item).

**Common Syntax:**
```
const LAresult = laArray.find(function(ldItem) {
    return condition;
});
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| ldItem  |  object  |  current item from the array       |

**Use Cases**

A sales rep is creating a Sales Order. The system should check if a specific promotional item (e.g., item_code: "PROMO-123") is included — to apply special pricing or show a reminder.

```
let lPromoItem = frm.doc.items.find(idItem => idItem.item_code === "PROMO-123");

if (lPromoItem) {
    frappe.msgprint("You’ve added the promotional item! Don’t forget to apply the special discount.");
}
```
**Sample Output**
```
A popup message displaying "You’ve added the promotional item! Don’t forget to apply the special discount."
```

### 4. filter() – Filter Matching Items

**Description:** Returns a new array with all items that match the condition (e.g. expensive items).

**Common Syntax:**
```
const LDresult = laArray.filter(function(ldItem) {
    return condition;
});
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| ldItem  |  object  |  current item from the array       |

**Use Cases**

You want to extract all items that belong to the item group "Transformers" to apply some logic — for example warranty rules.

```
let laTransformerItems = frm.doc.items.filter(item => item.item_group === 'Transformers');

// You can now use laTransformerItems for further logic
console.log("Transformer Items:", laTransformerItems);

laTransformerItems.forEach(ldItem => {
    ldItem.warranty_months = 24;  // Set a default warranty
});
```


### 5. reduce() – Calculate Total Value

**Description:** Reduces the array to a single value (e.g. total sales order amount).

**Common Syntax:**
```
const LDresult = laArray.reduce(function(lAccumulator, ldItem) {
    return updatedAccumulator;
}, lInitialValue);
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| lAccumulator  |  number  |  total/result       |
| ldItem  |  object  |  Current item in the array       |
| lInitialValue  |  number  |  Starting value (e.g. 0)       |

**Use Cases**

You want to calculate the total value of a Sales Order for quote submission.

```
//Calculate total amount of sales order
const LtotalAmount = salesOrder.items.reduce(function(lAcc, ldItem) {
    return lAcc + ldItem.qty * ldItem.rate;
}, 0);

console.log("Total Sales Order Amount:", LtotalAmount);
```

**Sample Output:**
```
Total Sales Order Amount: 27000
```

## JavaScript Child Table

### Accessing All Rows in a Child Table
**Description:** Access all rows (documents) inside the items child table.

**Common Syntax** 
```
const laChildRows = frm.doc.items;
laChildRows.forEach(function(ldRow, lIndex) {
    // perform operations
});
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| laChildRows  |  array  |  Array of child table rows      |
| ldRow  |  object  |  Current row in the child table       |
| lIndex  |  number  |  Index of the current row      |

**Common Patterns or Use Cases**
```
frm.doc.items.forEach(function(ldRow, lIndex) {
    console.log(`Item ${lIndex + 1}:`, ldRow.item_code);
});
```

**Sample Output:**

Item 1: DTTHZ2N 1200/10/400/6/75
Item 2: DTTHZ2N 800/10/400/6/50

### Adding a New Row to Child Table

**Description:** Programmatically adds a new row to the items table.

**Common Syntax:**

```javascript
let lNewRow = frm.add_child("items");
lNewRow.item_code = "DTTHZ2N 2000/12/440/6/75";
frm.refresh_field("items");
```

| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| frm  |  object  |  Current form instance      |
| lNewRow  |  object  |  Newly added child table row |
  

**Common Patterns or Use Cases**
```
const lNewRow = frm.add_child("items");
lNewRow.item_code = "DTTHZ2N 2000/12/440/6/75";
lNewRow.qty = 2;
lNewRow.rate = 150;
frm.refresh_field("items");
```

**Sample Output:**
A new row appears in the child table with DTTHZ2N 2000/12/440/6/75.

### Accessing Specific Row by cdt and cdn
Use `locals[cdt][cdn]` to access or update a specific row in a child table — typically within **child table event handlers** like `fielname`, `{fieldname}_add`, etc.

**Common Syntax**
```
let lRow = locals[cdt][cdn];
console.log(lRow.item_code);
```
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| cdt  |  string  |  Child Doctype      |
| cdn  |  string  |  Unique row identifier |
| locals  |  object  |  Local model holding all doc data |

**Common Patterns or Use Cases**
```
frappe.ui.form.on("Sales Order Item", {
    rate(frm, cdt, cdn) {
        let ldRow = locals[cdt][cdn];
        if (ldRow.qty === 0) {
            ldRow.qty = 1;
            frm.refresh_field("items"); //items is the field name of child table in parent doctype
        }
    }
});

```

**Sample Output:**
```
Row is updated to quantity 1.
```
**Where This Is Applicable**
| Scenario                                                  | Use `cdt` & `cdn`? | Explanation                                          |
| --------------------------------------------------------- | ------------------ | ---------------------------------------------------- |
| Inside `frappe.ui.form.on("Child Doctype", { ... })`      |  Yes              | You get `cdt` & `cdn` as arguments to access the row |
| Inside `on_change`, `on_add`, `on_remove` for child table |  Yes              | Ideal for updating specific fields in the row        |
| Inside parent Doctype events like `refresh`, `validate`   |  No               | Use `frm.doc.items` instead (an array of rows)       |


### Modifying Child Table Field Properties
**Description:**  Dynamically change a child table column’s properties like reqd, hidden, or read_only.

**Common Syntax**
```
frm.fields_dict["items"].grid.update_docfield_property("item_code", "read_only", 1);
frm.fields_dict["items"].grid.refresh();
```

| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| item_code  |  string  |  Fieldname in the child table    |
| read_only  |  string  |  Property to update |
| 1 / 0  |  boolean  |  Value of the updated property |

**Common Patterns or Use Cases**
```
frm.fields_dict["items"].grid.update_docfield_property("rate", "reqd", 1);
frm.fields_dict["items"].grid.refresh();
```

**Sample Output:**
```
The rate column in child table becomes mandatory.
```

### Clear or Set Options in a Field in Child Table
**Description:** Clear or dynamically change dropdown options for a child table field.

**Common Syntax**
```
frappe.meta.get_docfield("Sales Order Item", "item_group", frm.docname).options = "";
```
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| Sales Order Item  |  string  |  Child doctype name    |
| item_group  |  string  |  Field in the child table |
| frm.docname  |  string  |  Name of the parent document |

**Common Patterns or Use Cases**
```
frappe.meta.get_docfield("Sales Order Item", "item_group", frm.docname).options = "DTTH2n\nDOTML";
frm.fields_dict["items"].grid.refresh();
```

**Sample Output:**
```
Dropdown list for item_group is updated.
```


## Get value of password field
When used get_value() for password field, the return value is asterisk(encrypted), so use `get_password` method to retrieve the actual value of password type field

**Basic Syntax**
in client
```
frappe.call({
	"method": "frappe.client.get_password",
	"args":{
	"doctype": <doctype_name>
	"name": <document_name>
	"fieldName": <field_name>
	}
})
```
**Common Use Cases** 

 - getting the open api key from raven settings doctype
 ```
 frappe.call({
	 "method": "frappe.client.get_password",
	 "args":{
		 "doctype": "Raven Settings,
		 "name": "Raven Settings", //single doctype
		 "fieldName": "openai_api_key"
	}
	"callback": function(idResponse){
		if(idResponse.message){
			console.log("open api key", idResponse.message)
		}
	}
})
 ```
**Sample Output**
```
open api key fhryryfhghgus8ghffgfhffjfjgjreg
```

# **Using `frappe.client.get_list` with `frappe.call` – For accessing the child table**

* Specify which **fields** to return
* Select which records to include using **filters**



##  **Command Syntax**

```javascript
frappe.call({
    method: 'frappe.client.get_list',
    args: {
        doctype: '<Child Table Doctype>',
        parent: '<Parent Doctype>',
        filters: { parent: '<Parent Document Name>' },
        fields: ['<Field1>', '<Field2>'] // specify fields you want to retrieve
    },
    callback: function(response) {
        // handle the response here
        console.log(response.message);
    }
});

```



##  **Parameters & Options**

| Parameter | Type   | Description                                                                |
| --------- | ------ | -------------------------------------------------------------------------- |
| doctype   | string | The **Doctype** to retrieve records from (e.g., `"Sales Order"`)           |
| filters   | object | Conditions to filter the records (e.g., `{ "status": "Draft" }`)           |
| fields    | array  | List of fields to retrieve from each document (e.g., `["name", "status"]`) |



## Common Patterns or Use Cases for (Child Table) 

* Automatically fetch all organizations linked to that Git user.

* Show them in a message or set them in another field.




```javascript
 frappe.call({
    method: 'frappe.client.get_list',
    args: {
        doctype: 'Git User Organizations',  // Child Table Doctype
        parent: 'Git User',                 // Parent Doctype
        filters: { parent: frm.doc.custom_git_username },  // Parent Document Name
        fields: ['git_organization']        // Fields to Retrieve
    },
    callback: function(r) {
        if (r.message && r.message.length > 0) {
            // Example: Set the first organization name in a form field
            frm.set_value('organization_name', response.message[0].git_organization);
    }
    
    }
});
```

# Server Side

## frappe.get_doc in server side
Returns a document object for the given doctype and name, if no document match throw "DoesNotExistError".
Note: for single doctype, name is not required

**Basic Syntax**
```
frappe.get_doc(<doctype_name>, <document_name>)
```
**Common Use Case**
```
ld_task = frappe.get_doc("Task", "TASK-0023")
frappe.msgprint(str(ld_task.title)) //ex: title is Cpq Documentation
```
**Sample Output**
```
Cpq Documentation
```
For single doctype
```
ld_system_setting = frappe.get_doc("System Setting")
frappe.msgprint(str(ld_system_setting.theme)) //ex: theme is dark
```
**Sample Output**
```
dark
```
### Using `frappe.get_all` – Fetch Multiple Records from a Doctype
* Retrieves a list of records from a specific DocType.
* Returns a list of dictionaries with selected fields (or just names if no fields specified).
* Lightweight and efficient – ideal for read-only queries.
* Useful for querying main table fields and child table fields.

**Command Syntax**

```python
frappe.get_all(doctype, filters=None, fields=None, limit=None, order_by=None)
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| doctype  |  string  |  Name of the DocType to fetch records from.     |
| filters  |  dict/list  |  List of specified fields to fetch |
| limit  |  int  |  Limits number of results. Optional. |
| order_by  |  string  |  Sort order (e.g., "creation desc"). Optional. |

**Common Pattern or Use Cases**
```py
la_orders = frappe.get_all(
    'Sales Order',
    filters={'customer': 'ABB AG'},
    fields=['name', 'transaction_date'],
    order_by='transaction_date desc',
    limit=5
)
```
or
```py
# Get customer from current document
l_customer_name = doc.customer  # e.g., "ABB AG"

# Fetch Sales Orders with fields from main and child tables
la_sales_orders = frappe.get_list(
    "Sales Order",
    filters={"customer": l_customer_name},
    fields=[
        "name",
        "customer",
        "territory",
        # Sales Order Item (Child Table)
        "`tabSales Order Item`.item_code",
        "`tabSales Order Item`.qty",
        "`tabSales Order Item`.rate"
    ]
    order_by="transaction_date desc",
    limit=10
)

# Display each Sales Order with child item details
for ld_so in la_sales_orders:
    frappe.msgprint(f"""
        SO: {ld_so.name} | Customer: {ld_so.customer}
        Item: {ld_so.item_code} | Qty: {ld_so.qty} | Rate: {ld_so.rate}
    """)
```

**Sample Output:**
```
[{'name': 'SAL-ORD-2025-00014', 'transaction_date': datetime.date(2025, 5, 29)}, 
{'name': 'SAL-ORD-2025-00010', 'transaction_date': datetime.date(2025, 2, 18)}, 
{'name': 'SAL-ORD-2025-00011', 'transaction_date': datetime.date(2025, 2, 18)}, 
{'name': 'SAL-ORD-2025-00008', 'transaction_date': datetime.date(2025, 2, 5)}, 
{'name': 'SAL-ORD-2025-00007', 'transaction_date': datetime.date(2025, 2, 4)}]
```

### Using `frappe.get_list` – Fetch Records from a Doctype (Server Script)

* Retrieves a list of records from a specified doctype.
* Supports filtering, sorting, field selection, and limits.
* Commonly used in server scripts to extract data based on conditions.

**Command Syntax**
```py
frappe.get_list(doctype, filters=None, fields=None, order_by=None, limit=None)
```
**Parameters & Options:**
| Parameter | Type    | Description            |
| --------- | ------- | ---------------------- |
| doctype  |  string  |  Name of the DocType to fetch records from.     |
| filters  |  dict/list  |  List of specified fields to fetch |
| limit  |  int  |  Limits number of results. Optional. |
| order_by  |  string  |  Sort order (e.g., "creation desc"). Optional. |

**Common Pattern or Use Cases**
```py
# Get customer from current document
l_customer_name = doc.customer # l_customer_name = "ABB AG"

# Fetch Sales Orders for this customer
la_sales_orders = frappe.get_list(
    "Sales Order",
    filters={"customer": l_customer_name},
    fields=["name", "transaction_date", "grand_total"],
    order_by="transaction_date desc"
)

# Display each Sales Order
for ld_so in la_sales_orders:
    frappe.msgprint(f"Sales Order: {ld_so.name} | Date: {ld_so.transaction_date} | Total: ₹{ld_so.grand_total}")
```

**Sample Output:**
```
Sales Order: SAL-ORD-2024-0003 | Date: 2024-12-01 | Total: ₹75,000  
Sales Order: SAL-ORD-2024-0022 | Date: 2024-10-15 | Total: ₹52,000  
Sales Order: SAL-ORD-2025-0001 | Date: 2025-08-30 | Total: ₹19,500  
```

#### frappe.get_all vs frappe.get_list
| frappe.get_all                                      | frappe.get_list                                      |
|-----------------------------------------------------|------------------------------------------------------|
| Faster; optimized for raw data access               | Slightly slower due to permission and hook handling  |
| Does not check permissions by default               | Checks user permissions by default                   |
| Skips `get_list` hooks                              | Runs `get_list` hooks if defined                     |
| Only fetches database (DocType) fields              | Can fetch custom fields and computed properties      |
| Cannot access child tables or property setters      | Can access child tables and custom properties        |
| Best for internal scripts and background jobs       | Best for user-facing features and API responses      |
| Supports filters, fields, limit, and order_by       | Supports filters, fields, limit, and order_by        |
| Use `ignore_permissions=True` to override access    | Automatically respects permissions                   |
| Does not load DocType metadata                      | Loads and applies DocType metadata                   |
| Lightweight and fast                                | More feature-rich and secure                         |

### Using frappe.get_doc({...}) – Create and Load Documents in Frappe
* Used to create a new document with data or fetch an existing one.
* When passed a dictionary, it initializes a new document (not yet saved).
* Preferred for quickly building and inserting new documents with nested fields like child tables.

**Common Syntax**
```python
ld_doc = frappe.get_doc({
    "doctype": "<DocType>",
    "<fieldname_1>": "<value_1>",
    "<fieldname_2>": "<value_2>",
    # ... more fields
})
ld_doc.insert()

```
**Common Pattern or Use Cases**
 Create a Sales Invoice with multiple items using frappe.get_doc() and insert it into the system with child table data.

 ```python
ld_doc = frappe.get_doc({
    "doctype": "Sales Invoice",
    # Set known fields directly inside get_doc()
    "customer": "Test Customer",  # Can also be set later
    "items": [  # Child table: Sales Invoice Items
        {
            "item_code": "ITEM-001",
            "qty": 2,
            "rate": 500
        },
        {
            "item_code": "ITEM-002",
            "qty": 1,
            "rate": 300
        }
    ]
})

# Optionally set or override fields after initialization
# Useful when values are dynamic or require conditional logic
ld_doc.due_date = "2025-07-10"
ld_doc.tax_category = "Standard"

# Save the document to the database
ld_doc.insert()

 ```

**Sample Output**
 ```
A new Sales Invoice will be created for the customer "Test Customer" with the following items:
ITEM-001: Quantity = 2, Rate = 500
ITEM-002: Quantity = 1, Rate = 300
The document will be saved in the system with a status of "Draft"
 ```

---

### Using `doc.save()` – Save a Document on the Server Side
* Saves the document to the database.
* Triggers validations and standard lifecycle events like `before_save`, `validate`, `on_update`, and `after_save`.

---

**Command Syntax**

```python
doc.save()
```

**Common Pattern or Use Cases**
```py
# Create and save a new document
ld_sales_order = frappe.new_doc("Sales Order")
ld_sales_order.customer = "Test Customer"
ld_sales_order.append("items", {
    "item_code": "DTTHZ2N/1000/22/440/6/95",
    "qty": 2
})
ld_sales_order.save()
```
**Sample Output:**
```
{
  "name": "SO-0004",
  "doctype": "Sales Order",
  "customer": "Test Customer",
  "delivery_date": "2025-06-20",
  "items": [
    {
      "item_code": "DTTHZ2N/1000/22/440/6/95",
      "qty": 2,
      "doctype": "Sales Order Item",
      "parent": "SO-0004",
      "parenttype": "Sales Order",
      "parentfield": "items"
    }
  ]
}
```
**Best Practice (doc.save())**

| Avoid This |  Why It Matters |
|--------------|-------------------|
| `doc.save(ignore_permissions=True)` | It skips permission checks. This can cause security issues. Use it only when really needed. |
| Calling `doc.save()` inside a loop | It runs validations and writes to the database many times. This makes the code slow. Save once after the loop. |

### Using `doc.insert()` – Insert a New Document into the Database
* Inserts a brand-new document into the database.
* Used only for new records (not for updates).
* Triggers standard lifecycle events like `before_insert`, `validate`, and `after_insert`.

---

**Command Syntax**

```python
doc.insert()
```
**Common Pattern or Use Cases**
```py
ld_customer = frappe.new_doc("Customer")
ld_customer.customer_name = "Test User"
ld_customer.customer_group = "Commercial"
ld_customer.territory = "India"
ld_customer.insert()
```
**Sample Output:**
```py
{
  "name": "TEST USER",
  "doctype": "Customer",
  "customer_name": "Test User",
  "customer_group": "Commercial",
  "territory": "India",
}
```

## Doctype's MetaData

use `get_meta` to get specific Doctype's information along with the custom field and property setter

**Basic Syntax**
This method can only be used on Server Side
```python
frappe.get_meta('<doctype_name>')
```

**Common Use Cases**
```python
ld_ToDo_meta = frappe.get_meta("ToDo")
frappe.msgprint(str(ld_ToDo_meta.fields)) #printing the meta information of the fields

#Note: str() should be used to flaten the object, otherwise it will be printed as [Object][Object]
```
**Sample Output**
```
{
  "message": [
    {
      "name": "jv5ncgrirp",
      "docstatus": 0,
      "parent": "ToDo",
      "parentfield": "fields",
      "parenttype": "DocType",
      "idx": 1,
      "fieldname": "description_and_status",
      "fieldtype": "Section Break",
      "hidden": 0,
      .......},
      {
      "name": "jv511449u4",
      "docstatus": 0,
      "parent": "ToDo",
      "parentfield": "fields",
      "parenttype": "DocType",
      "idx": 2,
      "fieldname": "status",
      "label": "Status",
      "fieldtype": "Select",
      "options": "Open\nClosed\nCancelled",
      ....},
      ....
      ]}
```
## Using frappe.make_post_request – Send HTTP POST Requests (Server Script)

* Sends a server-side HTTP POST request to an external API.

* Commonly used in Server Scripts, Webhook integrations, and 3rd-party API calls.

* Automatically handles JSON encoding and headers.

**Basic Syntax**
```
frappe.make_post_request(url, data={'username: 'test'})
```

**Parameters**
| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| `url`     | string | Target API endpoint (e.g., `https://slack.com/api/chat.postMessage`) |
| `data`    | dict   | Dictionary of data to send (auto-converted to JSON)                  |
| `headers` | dict   | Optional HTTP headers (e.g., `Authorization`, `Content-Type`)        |

**Common Use Cases**
```
# Prepare payload
data = {
    "channel": "your-channel-id",
    "text": "Quotation *QTN-0001* was just created."
}

# Define headers
headers = {
    "Authorization": "Bearer xoxb-your-token",
    "Content-Type": "application/json"
}

# Send the POST request
response = frappe.make_post_request(
    url="https://slack.com/api/chat.postMessage",
    data=data,
    headers=headers
)

# Handle response
if response.get("ok"):
    frappe.msgprint("✅ Slack message sent!")
else:
    frappe.msgprint("❌ Slack error: " + response.get("error", "Unknown error"))
```

**Sample Response**
```
{
  "ok": true,
  "channel": "Channel-id",
  "ts": "1622567890.000400",
  "message": {
    "text": "Quotation *QTN-0001* was just created.",
    "type": "message",
    "ts": "1622567890.000400"
  }
}

```


# CPQ CheatSheet
## Setting a watch flag for a field
In client script you use `fieldName(frm)` to implement onChange of specific field. similarly, you can achieve the same in vue js using `watch()`
Note: only use it on core, not on CRM Form Script

**Basic Syntax**
```
watch(fieldName, (NewValue, OldValue) =>{
//your logic
}
{ immediate: false } //to avoid initial undefined error onmount
)
```
**Common Use Cases** 

 - On Change of tabs from Activity to Note, 
 ```javascript
 watch(tabs, (CurrentTab, PreviousTab) => {
	 //using watch we can access previous and current value of the field
	 console.log("previous selected tab", PreviousTab)
	 console.log("current selected tab", CurrentTab)
	}
	{immediate: false}
)
 ```
**Sample Output**
```
previous selected tab Activity
current selected tab Note
```
## Custom Button in CPQ
use CRM Form Script (client script for CPQ) to add custom button in the both ListView or Individual View

**Pre-requisite**
Go to CRM Form Script, create a new CRM Form Script with Name "Custom Button", Doctype: "CRM Deal", Apply To: "Form" and enable the script

**Basic Syntax**
```
action:[{"label": <label>, "onClick": () => {//your logic}
}]
```
**Common Use Cases** 

 - Create a View Quotation button on Deal 
 ```
 function setupForm({ doc }) {
    return {
 action:[{"label": "View Quotation", "onClick": () => {console.log("The button "View Quotation" is clicked")}
 }]
 }
 }
 ```
**Sample Output**
 - Open the Existing Deal Document, you will see the "View Quotation" button at top right corner
 - On clicking the "View Quotation" button
 ```
 //in browser console
 The button "View Quotation" is clicked
 ```

## Navigating pages using router
To navigate between pages like from **Deal** to **Quotation** in **CPQ** using a **Frappe form script**, you can use `router()` which is similar to set_route() in frappe

**Pre-requisite**
Include the `router` param in the `setupForm` function

**Basic Syntax**
```
router.push({"name": <doctype_name>, "params": {"name": <id>}
})
```
**Common Use Cases** 

 - navigate to the quotation created for the Specific Deal (ex: CRM-DEAL-0003) 
 ```
  function setupForm({ doc, router }) {
    return {
 action[{
 "label": "View Quotation",
 "onClick": () => {
	 router.push({"name": "Quotation", "params": {"name": doc.custom_quotation_id}
     })
	}
}] 
}
}
 ```
**Sample Output**
On clicking the View Quotation button in the CRM-DEAL-0003 will take you to the Quotation

## ref  in Vue js
Use `ref()` to create a value, where Vue wraps it in a reactive object so it can track changes and trigger updates in the UI when used in templates.

**Pre-requisite**
```javascript
import { ref } from 'vue'
```
**Basic Syntax**
```javascript
ref(<intial_value>)
//`intial_value` can be any type: number, string, boolean, array, object, etc.
```
**Common Use Cases **
```javascript
<template>
<Button 
	:label="__('Create')"
	:loading="IsLoading" //When you use a `ref` variable in the template, Vue automatically unwraps `.value`, so you can use it directly.
	@click="fnHandleClick" />
</template>
<script setup>
const IsLoading = ref(false)
function fnHandleClick(){
	IsLoading.value = true  //To access or update it: use `.value`
	.....
	//after successfull created
	IsLoading.value = false 
}
</script>
```
**Sample Output**
When you clicked the "Create" button an spinner animation appear, after successfully creation, the button come back to normal

## reactive in Vue.js

 - `reactive()` makes an object "watchable" so Vue knows when its data
   changes.
 - the difference between ref() and reactive() is that reactive only work with object or array, so you can't use it for single primitive like reactive(5) or reactive(false)

**Pre-requisite**
```javascript
import { reactive } from 'vue'
```
 **Basic Syntax**
```javascript
reactive({
	"name":"",
	"items":[]
	})
```
**Common Use Cases **
```javascript
<template>
<FormControl 
	:label="__('Design Template')"
	type="text"
	:placeholder="design_template"
	@change="(value)=> fnHandleUpdate("design_template", value)"
	/>
</template>
<script setup>
const Design = reactive({"design_template":"", "direct_material": ""})
function fnHandleUpdate(iField, iValue){
	Design[iField] = iValue
	console.log(`${iField} is set to ${iValue}`)
}
</script>
```
**Sample Output**
```
Design Template is set to Step Up
```

##  Frappe Resource API
`createResource()` from frappe-ui is an build in reactive object that is used for `async` data fetching and processing with build in loading state, cache, error handling and watcher
**Pre-requisite**
```javascript
import { createResource } from 'frappe-ui'
```
 **Basic Syntax**
```javascript
createResource({
	url: <method_path>,
	params: {<filters, fields>},
	cache: ['<cache_name>', <variable_of_createResouce>],
	auto: true,
	onSuccess(data){}, //on successful response
	transform(data){}, //transform data before setting it
	onError(error){}, //error can occur from failed request and validate function
	makeParams(){}, //generate params from function
	validate(params){}, //validate parameters before making request
})
```
**Common Use Cases **
```
const LaFieldLayout = createResource({
	url: "crm.fcrm.doctype.crm_fields_layout.crm_fields_layout.get_fields_layout",
	params:{ doctype: "Item", type: "Quick Entry"},
	cache: ["tabs", LaFieldLayout],
	auto: true,
	onSuccess(iaTabs){
		//the return structure of this endpoint will be like
		//[{secions:[columns:[fields:[fieldName: "", fieldType: ""]]]}, {}]
		iaTabs.forEach((idTab) => {
			idTab.sections.forEach((idSection) => {
				idSection.columns.forEach((idColumn) => {
					idColumn.fields.forEach((idField) => {
						if(idField.fieldType == "Table"){
							console.log("Field name", idField.fieldName)
						}
					})
				})
			})
		})
	}
})
```
**Sample Output**
```
Field name Item Attribute
```
## Classes and Objects

## Constructor
A **constructor** is a special method in a class that gets called automatically when a new instance of the class is created. It is used to **initialize the object** with values or set up initial logic.**Basic Syntax:**
```ts
class ClassName {
    constructor(parameter1: Type, parameter2: Type) {
        // Initialization code here
    }
}
```
You can access the constructor via the `new` keyword:

```ts
const obj = new  ClassName(value1, value2);
```
**Use Case**
We use constructors in **base and derived classes** to **pass and initialize shared data** like `action` and `actionData`.

```ts
class clActionOnLoad extends clAction {
    constructor(iAction: string, iaActionData: TTactionsData) {
        super(iAction, iaActionData); // Calls the constructor of the base class
    }
    // overrides and method calls
}
```
**WHY**
-   You pass data like `action` and `actionData` to the base class once.
-   You avoid repeating initialization logic in every subclass.
-   Subclasses can still add their own logic **after calling `super()`**.

## Interface
An **interface**  is a syntactic contract that defines the **structure of an object or class**. It ensures that a class or object adheres to a particular shape by specifying what properties and methods it must have.**Basic Syntax:**

```javascript
interface InterfaceName {
    propertyName: type;
    methodName(): returnType;
}
```
**Use Case:**
We use the **interface** in the `types.ts` file to **define the structure** that any class or object must follow. In this case, the `ifActionHandler` interface acts as a **contract** for all action handlers, ensuring they have the necessary properties and methods.

```javascript
interface ifActionHandler {
    action: string;
    actionData: TTactionsData;
    actionRow: TactionData;
    executeAction(): void;
    checkFieldValue(): void;
    checkFieldProperties(): void;
    dataType: ifDataType;
}
```
Use this interface in an **abstract class**:

```javascript
abstract class abstract class clAction implements ifActionHandler {
    // Must implement all properties and methods from the interface
}
```
**WHY:**
-   By using the interface in the `types.ts`, you define a **standard structure** for all actions.
-   Every class that implements this interface will be forced to follow that structure.
-   This helps in maintaining **consistency**, improving **type safety**, and enabling **scalable code architecture**.

## Factory class
	
Use a factory class when you need to **dynamically create instances** of different classes based on a runtime condition (e.g., a string key), **without hardcoding class instantiations**.**Use Case:**
Dynamically create and return the correct `clAction` subclass based on the action type string at runtime (e.g., `"Onload"`, `"Add Row"`, etc.).
```javascript
// Factory class to create action instances dynamically based on action type
class clActionFactory {
  private static actionsMap: {
    [key: string]: new (iAction: string, iaActionData: TTactionsData) => clAction
  } = {
    "Onload": clActionOnLoad,
    "On Change": clActionOnChange,
    "On Tab": clActionOnTab,
    "Add Row": clActionAddRow,
    "Edit Details": clActionEditDetails,
    "Expand Section": clActionExpandSection,
  };
  // Factory method to return the correct action class instance at runtime
  static createAction(
    type: string,                         // Action type string (e.g., "Add Row")
    iAction: string,
    iaActionData: TTactionsData
  ): clAction {
    const ActionClass = this.actionsMap[type];
    if (!ActionClass) {
      throw new Error(`Action type '${type}' is not registered.`);
    }
    // Return a new instance of the action class
    return new ActionClass(iAction, iaActionData);
  }
}
```
-   Easily create instances of different classes based on a string key without hardcoding logic.
-   Easily register new actions by adding to `actionsMap`
-   Keeps instantiation logic centralized.






