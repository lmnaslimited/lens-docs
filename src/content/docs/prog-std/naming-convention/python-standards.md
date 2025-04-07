---
title: Python Naming Conventions
---

### 1. Variables Naming Convention

#### a. Local Variables (l prefix)
Local variables should use the `l` prefix to indicate that they are used within a limited scope (e.g., inside a function or a small block).

- **Example**:
  ```python
  l_order_total = 2500  # Local variable storing the total amount for an order
  l_user = fn_get_user_details()  # Local variable holding user details
  ```

#### b. Local Arrays (la prefix)

Local arrays should have the la prefix to signify that they are used for storing multiple items.

- **Example**:
  ```python
    la_items = [item1, item2, item3]  # Local array holding a collection of items
    la_orders = fn_get_orders()  # Local array holding a collection of orders
   ``` 

#### c. Local Dictionaries (ld prefix)

Local dictionaries (or objects) should have the ld prefix to indicate they hold key-value pairs.

 - **Example**:
  ```python
    ld_user_details = {"name": "John", "age": 30}  # Local dictionary holding user details
    ld_order_data = {"order_id": 123, "status": "Shipped"}  # Local dictionary for order data
  ```

#### d. Input Parameters (i prefix)

Input parameters should be prefixed with i to clearly distinguish them from other variables.

- **Example**:
  ```python
    def fn_calculate_total(id_order_id):
        l_order = fn_get_order(id_order_id)  # i_order_id is the input parameter
  ``` 

#### e. Input Arrays (ia prefix)

Input arrays should be prefixed with ia to show that they store multiple values passed as input.

- **Example**:
  ```python
    def fn_process_orders(ia_order_ids):
        for l_order_id in ia_order_ids:
            fn_process_order(l_order_id)  # ia_order_ids is the input array
  ```

#### f. Input Dictionaries (id prefix)

Input dictionaries should be prefixed with id to indicate they hold key-value pairs passed as input.

- **Example**:
  ```python

    def fn_update_order_status(id_order_details):
        id_order_details["status"] = "Shipped"  # id_order_details is the input dictionary
  ```

### 2. Function Naming Convention
#### a. Function Names (fn prefix)

Function names should start with the fn prefix to clearly identify them as functions.

- **Example**:
  ```python

    def fn_calculate_total_amount():
        # Function logic for calculating total amount
        pass

    def fn_process_order(ia_order_id):
        # Function logic to process an order
        pass
  ``` 
#### b. Meaningful Function Names

Function names should be descriptive and reflect the action or behavior the function performs. This makes the code easy to understand and maintain.

- **Example**:
  ```python

    def fn_calculate_total_amount():
        # Calculates the total amount for the order
        pass

    def fn_update_order_status(ia_order_id, i_status):
        # Updates the status of an order
        pass
  ```

### 3. Class Naming Convention
#### a. Class Names (PascalCase)

Class names should follow the PascalCase convention, where each word starts with an uppercase letter and no underscores or hyphens are used.

- **Example**:
  ```python

    class cl_order:
        def __init__(self, ia_order_id, i_total_amount):
            self.ia_order_id = ia_order_id
            self.i_total_amount = i_total_amount

        def fn_calculate_total(self):
            # Logic to calculate the order total
            pass
  ```

### 4. Interface Naming Convention
#### a. Interface Names (I prefix)

In Python, we don't have a formal interface concept, but we can follow naming conventions to simulate interfaces. Prefix interface-like classes with I.

- **Example**:

##### Simulating an interface-like class
```py
class IOrder:
    def __init__(self, ia_order_id, i_status):
        self.ia_order_id = ia_order_id
        self.i_status = i_status

    def fn_calculate_total(self):
        raise NotImplementedError("Subclasses must implement this method")
```

##### Implementing the interface-like class
```py
class OrderImplementation(IOrder):
    def __init__(self, ia_order_id, i_status, i_total_amount):
        super().__init__(ia_order_id, i_status)
        self.i_total_amount = i_total_amount

    def fn_calculate_total(self):
        return self.i_total_amount
```
 
 # Summary of Naming Conventions in LENS (Python)

| **Category**             | **Prefix** | **Naming Convention**                                  | **Example**                                  |
|--------------------------|------------|--------------------------------------------------------|----------------------------------------------|
| **Local Variables**       | l_          | Temporary variables used within functions              | `l_order_total`               |
| **Local Arrays**          | la_         | Arrays holding multiple items                          | `la_order_items`             |
| **Local Dictionaries**    | ld_         | Key-value pairs or objects                             | `ld_customer_info`         |
| **Input Parameters**      | i_          | Parameters passed into functions                       | `i_customer_id`               |
| **Input Arrays**          | ia_         | Arrays passed into functions                           | `ia_order_items`             |
| **Input Dictionaries**    | id_         | Dictionaries passed into functions                     | `id_customer_info`         |
| **Function Names**        | fn_         | Descriptive function names starting with `fn`          | `fn_calculate_total_amount()` |
| **Special Case Variables**| N/A        | Reserved names in frameworks (e.g., frm, doc, fieldname) | `frm.doc.field_name`         |
| **Interface Names**        | I_         | Prefix with `I` followed by PascalCase for interfaces (optional)   | `IOrder`                             |
| **Class Names**            | cl_        | Use **PascalCase** for class names with prefix 'cl'      | `cl_order_processing`            |