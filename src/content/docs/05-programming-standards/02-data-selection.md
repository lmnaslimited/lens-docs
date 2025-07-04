---
title: Programming Standards - Data Selection
---

## Efficient Data Retrieval
When working with data, always prefer using the built-in ORM (Object Relational Mapper) methods such as `frappe.get_list` or `frappe.get_value` along with `filters` and `fields`.
> **Note** Advisable to use frappe models for better performance

**❌ Incorrect Way**
```python
# Fetching all records and filtering in Python — NOT recommended
la_all_employees = frappe.get_list("Employee")
la_active_employees = []
for ld_emp in la_all_employees:
	# stores only those employees whose `status` is `"Active"`
    if ld_emp.status == "Active":
        la_active_employees.append(ld_emp)
```
**Why ?**
* **Inefficient**: All rows and fields are fetched, even if most are unused.
* **Memory Usage**: Increases server-side load and response time.

**✅ Correct Way**
```python
# Fetch only what you need using filters and fields
la_active_employees = frappe.get_list(
    "Employee",
    filters={"status": "Active"},
    fields=["name", "department", "status"]
)
```
**Sample Output**
```
[
    {"name": "EMP-0001", "department": "HR", "status": "Active"},
    {"name": "EMP-0003", "department": "IT", "status": "Active"},
    {"name": "EMP-0007", "department": "Finance", "status": "Active"}
]
```
---
## Avoid Raw SQL
Use Frappe’s ORM methods for most database tasks. It keeps your app safe, clean, and easy to maintain. Only use raw SQL when absolutely needed.

>**Note** Avoid raw SQL unless the use case demands complex queries or performance tuning that ORM cannot handle.

**When is raw SQL acceptable?**

-   When you need to run **complex queries** that cannot be expressed using the ORM.
-   For **performance-critical** operations where ORM queries are too slow after profiling.
   

**❌ Incorrect Way**
```python
# Define date range filters
ld_filters = {
    "from_date": "2025-01-01",
    "to_date": "2025-01-31"
}
# Raw SQL query to fetch Sales Order names within the date range and docstatus not equal to 2
ld_sos = frappe.db.sql("""
    SELECT name
    FROM `tabSales Order`
    WHERE po_date BETWEEN %(from_date)s AND %(to_date)s
      AND docstatus != 2
    """,
    {
        "from_date": ld_filters['from_date'],
        "to_date": ld_filters['to_date']
    },
    as_dict=1
)
```
**Why ?**
* Harder to read and maintain because it mixes SQL syntax in Python code
* More error-prone and vulnerable to SQL injection
* Tied closely to database structure, making future changes difficult

**✅ Correct Way**
```python
# Define date range filters
ld_filters = {
    "from_date": "2025-01-01",
    "to_date": "2025-01-31"
}
# Fetch Sales Order names using Frappe ORM with filters and selected fields
ld_sos = frappe.get_list(
    "Sales Order",
    filters=[
        ["po_date", "between", [ld_filters["from_date"], ld_filters["to_date"]]],
        ["docstatus", "!=", 2]
    ],
    fields=["name"]
)
```
**Sample Output**
```
[
    {"name": "SO-0001"},
    {"name": "SO-0002"},
    {"name": "SO-0003"}
]
```
---
## Conditional Data Access
When working with Frappe ORM methods like `get_doc`, `get_value`, or `db.get`, it’s important to first check whether the data exists or is actually needed. This helps you avoid unnecessary errors.
Conditional checks should be applied especially before insert operations, but may not be needed in other cases like simple reads.
**❌ Incorrect Way**
```python
# Directly retrieving without verifying if the record exists — NOT recommended
l_user = frappe.session.user
ld_user_defaults = frappe.get_value("User Session Defaults", {"user": l_user}, ["from_date", "to_date"])
```
**Why ?**
* **Risk of Runtime Errors**: If the record doesn’t exist, it throws `DoesNotExistError`
* **Bad for Performance**: Unchecked DB lookups increase load.


**✅ Correct Way**
```python
# Check before fetching to ensure safety and efficiency
l_user = frappe.session.user
if frappe.db.exists("User Session Defaults", l_user):
    ld_user_defaults = frappe.get_value("User Session Defaults", {"user": l_user}, ["from_date", "to_date"])
```
**Sample Output**
```
{
    "name": "USR-SESSION-002",
    "user": "admin@example.com",
    "default_company": "ACME Inc.",
    "default_currency": "USD"
}
```
---
## Use Caching for Expensive or Repeated Queries
When reading frequently used documents that don't change often (like configuration or settings), it's more efficient to use `frappe.get_cached_doc()` instead of repeatedly fetching from the database.
If the document is not found in the cache, it will be retrieved from the database, and the retrieved document will be stored in the cache for future access

**❌ Incorrect Way**
```python
# It is not suitable in this context since it will hit db everytime
ld_Print_settings = frappe.get_doc("Print Settings")
```
**Why ?**
* Hits the database every time.
* Slower, especially if used repeatedly across multiple requests.
* Wastes server resources for data that rarely changes.


**✅ Correct Way**
```python
# Uses cached version of the document
ld_print_settings = frappe.get_cached_doc("Print Settings")
```
> **Note** 
> - Reads from in-memory cache if available.
> - Automatically revalidates the cache if the document changes via `.save()` or `frappe.db.set_value()`.
> - Reduces DB load and improves performance.

**Sample Output**
```
{
    "doctype": "Print Settings",
    "name": "Print Settings",
    "letter_head": "Default Letter Head",
    "print_timeline": 1,
    "repeat_header_footer": 1,
    "compact_item_print": 0,
    "line_break_for_hierarchy": 0,
    "with_letterhead": 1,
    "print_style": "Modern",
    "pdf_page_size": "A4",
    "pdf_orientation": "Portrait",
    "created_by": "Administrator",
    "modified_by": "Administrator",
    "creation": "2024-01-15 10:30:00",
    "modified": "2024-05-01 16:12:00"
}
```
---
## Avoid Hardcoding Doctype or Field Names

Hardcoding doctypes or field names can lead to errors if names change, reduce code reusability, and make maintenance harder. By assigning repeated doctypes and fieldnames as variable we can keeps our code safer and more flexible..

**❌ Incorrect Way**
```python
# Hardcoded doctype and field access repeated multiple times
la_customer_name = frappe.get_value("Sales Invoice", "SINV-0001", "custom_customer_name")
la_invoice_status = frappe.get_value("Sales Invoice", "SINV-0001", "status")

if la_customer_name == "John Doe" and la_invoice_status == "Paid":
    frappe.msgprint("Customer matched and invoice is paid")
```
**Why ?**
* Breaks if `custom_customer_name` is renamed
* Not reusable for other doctypes.


**✅ Correct Way**
```python
# Assign repeated doctype and field names as variables for safety and flexibility
l_doctype = "Sales Invoice"  # could be passed as parameter
l_name = "SINV-0001"
l_field_customer_name = "custom_customer_name"
l_field_status = "status"

la_customer_name = frappe.get_value(l_doctype, l_name, l_field_customer_name)
la_invoice_status = frappe.get_value(l_doctype, l_name, l_field_status)

if la_customer_name == "John Doe" and la_invoice_status == "Paid":
    frappe.msgprint("Customer matched and invoice is paid")
```
**Sample Output**
```
Customer matched and invoice is paid
```
---