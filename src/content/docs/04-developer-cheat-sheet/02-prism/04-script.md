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

## Doctype's MetaDate

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

# Server Script

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