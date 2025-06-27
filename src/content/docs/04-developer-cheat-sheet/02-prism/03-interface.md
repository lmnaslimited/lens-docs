---
title: PRISM - Interface
---

### Accessing server api Through browser url
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
**Sample Output**
```json
{
  "message": "\"hello\""
}
```
### Base64 Auth Key via Terminal

Use this command to create a base64-encoded string for HTTPs Basic Authentication through terminal. This is commonly used when interacting with APIs that require credentials passed in an `Authorization` header.

**Basic Syntax**

```bash
echo -n "api_key:api_secret" | base64
```
**Example:**
```bash
echo -n "bc0a2c2d2acb0f9:20ebfe67fbf273b" | base64
```
**Output:**
```bash
YmMwYTJjMmQyYWNiMGY5OjIwZWJmZTY3ZmJmMjczYg==
```

**Common Use Cases**
 When calling an API endpoint that requires Basic Authentication:

```bash
curl -H "Authorization: Basic YmMwYTJjMmQyYWNiMGY5OjIwZWJmZTY3ZmJmMjczYg==" https://api.example.com/data
```
## Frappe Monkey Patching Technique
Monkey patching is a technique that allows you to dynamically modify or extend existing code at runtime without changing the original source files. In Python, this is possible because functions and methods are first-class objects that can be reassigned.

**Basic Syntax**
```python
# In your custom app's custom file (e.g., monkey_patch.py)
# Step 1: Import the original function you want to change
import frappe
from frappe.utils import getdate #core utitle function

# Step 2: Create your own version of that function
def custom_getdate(string_date):
    # Your custom logic
    print("Patched getdate called!")
    # Step 3: Use the original function if needed
    return original_getdate(string_date)

# Step 4: Save the original function (optional but useful)
original_getdate = getdate

# Step 5: Replace the original function with your version at custom app's hook.py file
from frappe.utils import getdate
from custom_app.<file_name> import custom_getdate
frappe.utils.getdate = custom_getdate

```
**Common Use Cases**
| Use Case                        | Example                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| Override core utility functions | `frappe.utils.getdate`, `frappe.sendmail`                    |
| Modify controller methods       | `SalesOrder.validate`, `Quotation.on_submit`                 |
| Customize API behavior          | Patch whitelisted method like `frappe.desk.form.load.getdoc` |
| Patch background job functions  | Modify logic inside long jobs                                |

**Example**
Your company wants to prevent users from backdating Sales Invoices — they should only be allowed to select today’s date or future dates.
However, by default, Frappe allows any posting date.

**Solution**
We'll override the default validate_posting_time method in accounts.doctype.sales_invoice.sales_invoice to add our custom date rule.
path: your_app/your_app/monkey_patch.py

```python
# Import the original Sales Invoice class
from erpnext.accounts.doctype.sales_invoice.sales_invoice import SalesInvoice
import frappe
from frappe.utils import nowdate

# Save the original method (optional, in case you want fallback)
original_validate_posting_time = SalesInvoice.validate_posting_time

# Create a new method
def custom_validate_posting_time(self):
    if self.posting_date < nowdate():
        frappe.throw("Backdated Sales Invoices are not allowed. Please choose today or a future date.")
    # You can still call the original method if needed
    # original_validate_posting_time(self)
```

path: your_app/your_app/hook.py
```python
from erpnext.accounts.doctype.sales_invoice.sales_invoice import SalesInvoice
from your_app.monkey_patch import custom_validate_posting_time

# Replace the method in the class with your version
SalesInvoice.validate_posting_time = custom_validate_posting_time
```
**Output**
Now, if a user tries to submit a Sales Invoice with a past posting date, they’ll see this:
```
Backdated Sales Invoices are not allowed. Please choose today or a future date.
```

## Customizations via hooks.py
The hooks.py file in your custom app is where you tell Frappe what to do and when — like plug-in points to modify behavior without touching the core.

### 1. doc_events
doc_events allows you to run custom Python functions during specific events of a DocType (like validate, on_submit, on_cancel, etc.).

**Basic Syntax**
```python
doc_events = {
    "{doctype_name}": {
        "{event}": "path.to.your_method"
    }
}

```
**Common Use Case**
Run custom validation before saving a Quotation
```python
doc_events = {
    "Quotation": {
        "validate": "my_app.events.quotation.validate_discount_limit" #custon python definition by default doc and event will be passed
    }
}

# the file look like
def validate_discount_limit(doc, method):
    if doc.additional_discount_percentage > 10:
        frappe.throw("Discount cannot exceed 10%.")
```

### 2. override_doctype_class
This allows you to completely replace the backend class of a standard DocType with your own custom class.

**Basic Syntax**
```python
override_doctype_class = {
    "{doctype_name}": "your_app.overrides.custom_class_path"
}
```
**Common Use Case**
Override the Sales Invoice class to change on_submit behavior:
```python
override_doctype_class = {
    "Sales Invoice": "my_app.overrides.custom_sales_invoice.CustomSalesInvoice"
}

# the file look like
class CustomSalesInvoice(SalesInvoice):
    def on_submit(self):
        super().on_submit()
        # Your custom logic here
        print("Custom on_submit called!")
```

### 3. override_whitelisted_methods
Used to replace any Frappe or ERPNext whitelisted API method with your own implementation.
**Basic Syntax**
```python
override_whitelisted_methods = {
    "path.to.original_method": "your_app.api.custom_method"
}
```
**Common Use Case**
Customize how link field search works:
```python
override_whitelisted_methods = {
    "frappe.desk.search.search_link": "my_app.api.custom_search_link"
}
# the file look like
@frappe.whitelist()
def custom_search_link(doctype, txt, query=None, filters=None, page_length=20):
    print("🔍 Using custom search link!")
   # your logic
    return search_widget(doctype, txt, query, filters, page_length)
```

### 4. override_report_class
Used to replace the Python class that powers a standard report.
**Basic Syntax**
```python
override_report_class = {
    "{report_name}": "your_app.reports.custom_report.CustomReportClass"
}
```
**Common Use Case**
Change how data is fetched in Accounts Receivable report:
```python
override_report_class = {
    "Accounts Receivable": "my_app.reports.accounts_receivable.CustomARReport"
}

# the file look like
class CustomARReport(AccountsReceivable):
    def run(self, filters=None):
        # Call parent method to get default data
        columns, data = super().run(filters)

        # Example: Add a new column
        columns.append({"label": "Overdue Alert", "fieldname": "overdue_alert", "fieldtype": "Data", "width": 120})

        # Example: Add logic to tag overdue invoices
        for row in data:
            row["overdue_alert"] = "⚠️ Overdue" if row.get("outstanding_amount", 0) > 0 and row.get("due_date") < self.today else ""

        return columns, data
```

### 5. scheduler_events
Run background jobs automatically at specific time intervals (daily, hourly, etc.)
**Basic Syntax**
```python
scheduler_events = {
    "{interval}": [
        "your_app.path.to.function"
    ]
}
```
**Common Use Case**
Send a summary report every day
```python
scheduler_events = {
    "daily": [
        "my_app.tasks.send_daily_sales_summary"
    ]
}
```

### 6. before_install / after_install
Used to run setup scripts when the app is installed.
**Basic Syntax**
```python
before_install = "your_app.install.before_install"
after_install = "your_app.install.after_install"
```
**Common Use Case**
Create default records after app installation:
```python
after_install = "my_app.install.setup_default_roles"
```

### 7. Fixtures
Fixtures are used to migrate specific data and settings from the custom app during its installation, so they could be available after installation

**Basic Syntax**
In the app's hook.py file
```python
fixtures = [
{
	"doctype": {doctype_name},
	"filters": [
		["name", "in", [{document_name}, {document_name}]]
	]
}]

```
**Note** : refer https://lmnaslimited.github.io/lens-docs/04-developer-cheat-sheet/01-infrastructure/03-bench-commands/#bench-fixtures-command for executing fixture
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

### 1. page_js
page_js allows you to include custom JavaScript files specifically for standard Frappe pages like print, query-report, dashboard, etc.

**Basic Syntax**
```python
page_js = {
    "{page_name}": "public/js/<filename>"
}

```
**Common Use Case**
Override the Print page's set_title function to hide the Print button for a restricted document like "Quotation" in Draft.
```python
# hooks.py
page_js = {
    "print": "public/js/print_restrict.js"
}
```
```javascript
//  custom_app/public/js/print_restrict.js
(function () {
    const fnOriginalSetTitle = frappe.ui.form.PrintView.prototype.set_title;
    frappe.ui.form.PrintView.prototype.set_title = function () {
    
    // Hide PDF button
    if(this.frm.doctype === "Quotation" && this.frm.doc.status === "Draft"){
        $(".btn.btn-primary.btn-sm.primary-action").hide();
    }
    fnOriginalSetTitle.call(this);
};
})
```