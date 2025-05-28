---
title: PRISM - Interface
---

# Fixtures
Fixtures are used to migrate specific data and settings from the custom app during its installation, so they could be available after installation

### Basic Syntax
In the app's hook. py file
```
fixtures = [
{
	"doctype": {doctype_name},
	"filters": [
		["name", "in", [{document_name}, {document_name}]]
	]
}]
```
### Common Use Cases 
Migrating a custom field using fixture
```
fixtures = [
    {
        "doctype": "Custom Field",
         "filters": [
            ["name", "in", ["CRM Lead-custom_prompt", "CRM Lead-custom_question_type"]]
         ]
    }]
```

# Accessing server api Through browser url
We can test the custom api directly without calling them in client / server script through browser

### Pre-requisite
A Server Script of Type API with return using `frappe.response['message']` (since we using in on browser, frappe.flag wont't work) should be there
ex: ``` frappe.response['message'] = "pong```

### Basic Syntax
in browser(chrome/ Firefox/ etc)
```
https://<sitename>/api/method/api_method?<parameter_name>="<your value>"
```
### Common Use Cases 
Without Argument
```
https://lenscx.docker.localhost/api/method/ping
```
### Sample Output
```json
{
  "message": "pong"
}
```
With Argument : if you have used `frappe.form_dict.get("<variable>")`
ex script in ping API:
 ```python
input = frappe.form_dict.get("message")
frappe.response['message'] = meta```
```
```
https://lenscx.docker.localhost/api/method/ping?message="hello"
```
### Sample Output
```json
{
  "message": "\"hello\""
}
```