---
title: PRISM - Interface
---

## Fixtures
Fixtures are used to migrate specific data and settings from the custom app during its installation, so they could be available after installation

**Basic Syntax**
In the app's hook.py file
```
fixtures = [
{
	"doctype": {doctype_name},
	"filters": [
		["name", "in", [{document_name}, {document_name}]]
	]
}]
```
**Common Use Cases** 
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

## Accessing server api Through browser url
We can test the custom api directly without calling them in client / server script through browser

**Pre-requisite**
A Server Script of type API should be used, with a return value set via frappe.response['message'] (since it's being accessed from the browser, frappe.flags won't be effective).
ex: ``` frappe.response['message'] = "pong```

**Basic Syntax**
in browser(chrome/ Firefox/ etc)
```
https://<sitename>/api/method/api_method?<parameter_name>="<your value>"
```
**Common Use Cases** 
Without Argument
```
https://lenscx.docker.localhost/api/method/ping
```
**Sample Output**
```json
{
  "message": "pong"
}
```
With Argument : if you have used `frappe.form_dict.get("<variable>")`
ex script in ping API:
 ```python
meta = frappe.form_dict.get("message")
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
## 1.Base64 Auth Key via Terminal

Use this command to create a base64-encoded string for HTTPs Basic Authentication through terminal. This is commonly used when interacting with APIs that require credentials passed in an `Authorization` header.

### Basic Syntax

```bash
echo -n "api_key:api_secret" | base64
```
#### Example: 
```bash
echo -n "bc0a2c2d2acb0f9:20ebfe67fbf273b" | base64
```
#### Output:
```bash
YmMwYTJjMmQyYWNiMGY5OjIwZWJmZTY3ZmJmMjczYg==
```

### Common Use Cases
 When calling an API endpoint that requires Basic Authentication:

```bash
curl -H "Authorization: Basic YmMwYTJjMmQyYWNiMGY5OjIwZWJmZTY3ZmJmMjczYg==" https://api.example.com/data
```