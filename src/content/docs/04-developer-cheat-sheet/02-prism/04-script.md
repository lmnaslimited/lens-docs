---
title: PRISM - Script
---

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


** Command Syntax

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

### Using the frappe.client.get_value method with `frappe.call` – Fetch Specific field

* Used to retrieve only selected fields 
* Lightweight and faster for quick lookups


** Command Syntax

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


** Command Syntax

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

# Doctype's MetaDate

use `get_meta` to get specific Doctype's information along with the custom field and property setter

### Basic Syntax
This method can only be used on Server Side
```python
frappe.get_meta('<doctype_name>')
```

### Common Use Cases 
```python
ld_ToDo_meta = frappe.get_meta("ToDo")
frappe.msgprint(str(ld_ToDo_meta.fields)) #printing the meta information of the fields

#Note: str() should be used to flaten the object, otherwise it will be printed as [Object][Object]
```
### Sample Output
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

# Get value of password field
When used get_value() for password field, the return value is asterisk(encrypted), so use `get_password` method to retrieve the actual value of password type field

### Basic Syntax
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
### Common Use Cases 

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
### Sample Output
```
open api key fhryryfhghgus8ghffgfhffjfjgjreg
```


# CPQ CheatSheet
# Setting a watch flag for a field
In client script you use `fieldName(frm)` to implement onChange of specific field. similarly, you can achieve the same in vue js using `watch()`
Note: only use it on core, not on CRM Form Script

### Basic Syntax
```
watch(fieldName, (NewValue, OldValue) =>{
//your logic
}
{ immediate: false } //to avoid initial undefined error onmount
)
```
### Common Use Cases 

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
### Sample Output
```
previous selected tab Activity
current selected tab Note
```
# Custom Button in CPQ
use CRM Form Script (client script for CPQ) to add custom button in the both ListView or Individual View

### Pre-requisite
Go to CRM Form Script, create a new CRM Form Script with Name "Custom Button", Doctype: "CRM Deal", Apply To: "Form" and enable the script

### Basic Syntax
```
action:[{"label": <label>, "onClick": () => {//your logic}
}]
```
### Common Use Cases 

 - Create a View Quotation button on Deal 
 ```
 function setupForm({ doc }) {
    return {
 action:[{"label": "View Quotation", "onClick": () => {console.log("The button "View Quotation" is clicked")}
 }]
 }
 }
 ```
### Sample Output
 - Open the Existing Deal Document, you will see the "View Quotation" button at top right corner
 - On clicking the "View Quotation" button
 ```
 //in browser console
 The button "View Quotation" is clicked
 ```

# Navigating pages using router
To navigate between pages like from **Deal** to **Quotation** in **CPQ** using a **Frappe form script**, you can use `router()` which is similar to set_route() in frappe

### Pre-requisite
Include the `router` param in the `setupForm` function

### Basic Syntax
```
router.push({"name": <doctype_name>, "params": {"name": <id>}
})
```
### Common Use Cases 

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
### Sample Output
On clicking the View Quotation button in the CRM-DEAL-0003 will take you to the Quotation
