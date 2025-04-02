---
title: JavaScript Naming Conventions
---

### 1. Variables Naming Convention

#### a. Local Variables (l prefix)
Local variables should use the `l` prefix to indicate they are used only within a limited scope (e.g., inside a function or a small block).

- **Example**:
```js
  let lOrderTotal = 2500;  // Local variable storing the total amount for an order
  let lUser = fnGetUserDetails();  // Local variable holding user details
```

#### b. Local Arrays (la prefix)

Arrays, which hold multiple items, should have the la prefix. This is particularly useful when you're dealing with lists of items, like orders or products.

- **Example**:
```js
    let laItems = [item1, item2, item3];  // Local array for holding a list of items
    let laOrders = fnGetOrders();  // Local array for holding a list of orders
```
#### c. Local Dictionaries (ld prefix)

Dictionaries (or objects) that store key-value pairs should have the ld prefix. This is useful for holding structured data like order details or user information.

- **Example**:
    ```js
    let ldUserDetails = { name: 'John', age: 30 };  // Local dictionary holding user details
    let ldOrderData = { orderId: 123, status: 'Shipped' };  // Local dictionary for order data
    ```
#### d. Input Parameters (i prefix)

Input parameters to functions should use the i prefix to clearly differentiate them from other variables. This makes it clear that they are provided as inputs to the function.

- **Example**:
```js
    function fnCalculateTotal(iOrderId) {
      let order = fnGetOrder(iOrderId);  // iOrderId is the input parameter
    }
```
#### e. Input Arrays (ia prefix)

When an array is passed as an input to a function, it should be prefixed with ia to signify that it stores multiple values.

- **Example**:
```js
    function fnProcessOrders(iaOrderIds) {
      iaOrderIds.forEach(lOrderId => fnProcessOrder(lOrderId));  // iaOrderIds is the input array
    }
```
#### f. Input Dictionaries (id prefix)

Dictionaries (objects) passed as input to a function should be prefixed with id.

- **Example**:
```js
    function updateOrderStatus(idOrderDetails) {
      idOrderDetails.status = 'Shipped';  // idOrderDetails is the input dictionary
    }
```
#### g. Constants (L-prefixed PascalCase)

Constants should be written in PascalCase with an `L` or `La` or `Ld` prefix based on their type:

- `L` for single values  
- `La` for arrays  
- `Ld` for dictionaries/objects 

- **Example**:
```js
    const LOrderTotal = 5000;  // Constant representing the order total
    const LaOrderStatuses = ['Pending', 'Shipped', 'Delivered'];  // Constant array of order statuses
    const LdShippingDetails = { method: 'Express', cost: 20 };  // Constant dictionary for shipping details
```

### 2. Function Naming Convention

#### a. Function Names (fn prefix)

Function names should start with "fn" to clearly identify them as functions.

- **Example**:
```js
    function fnCalculateTotalAmount() {
      // Function logic for calculating total amount
    }

    function fnProcessOrder(orderId) {
      // Function logic to process an order
    }
```
#### b. Meaningful Function Names

Function names should be descriptive, reflecting the action or behavior the function performs. This is crucial for readability and maintenance.

- **Example**:
```js
    function fnCalculateTotalAmount() {
      // Calculates the total amount for the order
    }

    function fnUpdateOrderStatus(idOrderId, idStatus) {
      // Updates the status of an order
    }
```

### 3. Class Naming Convention
#### a. Class Names (PascalCase)

Class names should follow the PascalCase convention, where each word starts with an uppercase letter and no underscores or hyphens are used.

- **Example**:
```js
    class Order {
      constructor(orderId, totalAmount) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
      }

      fnCalculateTotal() {
        // Logic to calculate the order total
      }
    }
```
    
### 4. Interface Naming Convention
#### a. Interface Names (I prefix)

For interfaces, prefix the name with the letter I (following typical JavaScript/TypeScript conventions, though JavaScript doesn't strictly use interfaces). This is to signify that the class is implementing this interface or that the object adheres to the structure outlined by the interface.

- **Example**:
```js
// Although JavaScript doesn't have formal interfaces, you can use an object or class structure to simulate one
class IOrder {
  constructor(orderId, status) {
    this.orderId = orderId;
    this.status = status;
  }

  fnCalculateTotal() {
    throw new Error('Method not implemented');
  }
}

// Implementing the interface
class OrderImplementation extends IOrder {
  constructor(orderId, status, totalAmount) {
    super(orderId, status);
    this.totalAmount = totalAmount;
  }

  fnCalculateTotal() {
    return this.totalAmount;
  }
}
```

### Summary of Naming Conventions in LENS

| **Category**              | **Prefix**  | **Naming Convention**                                               | **Example**                                      |
|---------------------------|-------------|---------------------------------------------------------------------|--------------------------------------------------|
| **Local Variables**        | `l`         | Temporary variables used within functions                           | `lOrderTotal`                 |
| **Local Arrays**           | `la`        | Arrays holding multiple items                                      | `laOrderItems`               |
| **Local Dictionaries**     | `ld`        | Key-value pairs or objects                                          | `ldCustomerInfo`,             |
| **Input Parameters**       | `i`         | Parameters passed into functions                                    | `iCustomerID`,                  |
| **Input Arrays**           | `ia`        | Arrays passed into functions                                        | `iaOrderItems`,                 |
| **Input Dictionaries**     | `id`        | Dictionaries passed into functions                                  | `idCustomerInfo`,              |
| **Function Names**         | `fn`        | Descriptive function names starting with `fn`                       | `fnCalculateTotalAmount()`,  |
| **Constants**              | Uppercase   | Constants written in uppercase with underscores                     | `MAX_ORDER_LIMIT`,             |
| **Special Case Variables** | N/A         | Reserved names in frameworks (`frm`, `doc`, `fieldname`)           | `frmOrderForm`, `docCustomerDetails`, |
| **Interface Names**        | `I`         | Prefix with `I` followed by PascalCase for interfaces (optional)   | `IOrder`,                             |
| **Class Names**            | N/A         | Use **PascalCase** for class names                                  | `OrderProcessing`,            |