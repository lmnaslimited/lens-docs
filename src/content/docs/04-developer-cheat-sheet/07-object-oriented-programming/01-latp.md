---
title: Object-Oriented Programming (OOP) Cheat Sheet for LATP Developers
---

This cheat sheet explains the **core Object-Oriented Programming (OOP) concepts used in the LATP (LENS AI Test Pilot) automation framework**, using examples from [action.ts](https://github.com/lmnaslimited/lens_ai_test_pilot/blob/develop/src/action.ts) file.

Object-Oriented Programming is a programming paradigm that organizes code using **objects and classes**, making systems **modular, reusable, and easier to maintain**.

---

## 1. Abstract Classes

An **Abstract Class** defines common structure and behavior for other classes, but **cannot be instantiated directly**.

It is meant to be **extended by child classes**.

### Use it when

- Multiple classes share common properties
- Multiple classes share common methods
- You want to enforce a consistent structure for all child classes

### Common Syntax

```ts
abstract class clAction {

  action: string;
  actionData: TTactionsData;

  constructor(iAction: string, iaActionData: TTactionsData) {
    this.action = iAction;
    this.actionData = iaActionData;
  }

  executeAction(): void {}

}
````

### Real LATP Use Case

In `action.ts`, the base class for all actions is `clAction`.

```
clAction (Abstract Base)
    │
    ├── clActionOnLoad
    ├── clActionOnChange
    ├── clActionAddRow
    ├── clActionSave
    ├── clActionSubmit
```

Example:

```ts
export class clActionOnChange extends clAction
```

This ensures every action class follows the same structure.

---

## 2. Inheritance

**Inheritance** allows a class to reuse properties and methods from another class.

A child class **extends** a parent class and can add or modify behavior.

### Use it when

* Multiple classes share common logic
* You want to avoid duplicate code
* Child classes only need small variations of parent logic

### Common Syntax

```ts
class clActionSave extends clAction {

  executeAction(): void {
    cy.get('.primary-action').click();
  }

}
```

### Real LATP Use Case

Example from LATP code:

```ts
export class clActionAmend extends clActionSave {
  protected lActionMessage: string = "amend successfully.";
}
```

Structure:

```
clAction
│
└── clActionSave
      │
      └── clActionAmend
```

`clActionAmend` reuses the **Save logic** but changes the message.

---

## 3. Polymorphism

**Polymorphism** means different classes implement the **same method in different ways**.

The caller does not need to know which class is executing.

### Use it when

* Multiple classes must implement the same method
* Behavior changes depending on action type
* The execution engine should remain generic

### Common Syntax

```ts
class clActionSubmit extends clAction {

  executeAction(): void {
    cy.contains('button', 'Submit').click();
  }

}

class clActionCancel extends clAction {

  executeAction(): void {
    cy.contains('button', 'Cancel').click();
  }

}
```

Both classes implement the same method:

```
executeAction()
```

But their behavior is different.

### Real LATP Use Case

The action execution engine calls actions generically:

```ts
const action = clActionFactory.createAction(iAction, actionData);

action.executeAction();
```

The engine does not know the actual class type.

Possible classes include:

```
clActionSave
clActionSubmit
clActionDelete
clActionAddRow
clActionOnChange
```

Each class implements its own behavior.

---

## 4. Factory Pattern

A **Factory Pattern** is a design pattern used to create objects dynamically based on input.

Instead of writing large `if` or `switch` statements, object creation is centralized.

### Use it when

* Many classes represent different behaviors
* Object creation depends on runtime configuration
* You want scalable and maintainable code

### Common Syntax

```ts
static createAction(iAction: string, iaActionData: TTactionsData) {

  const ActionClass = this.actionsMap[iAction];

  if (!ActionClass) {
    throw new Error(`Invalid action type`);
  }

  return new ActionClass(iAction, iaActionData);

}
```

### Real LATP Use Case

In LATP Test Case configurator, actions are stored as text:

```
On Change
Save
Submit
API GET
```

The factory maps them to classes:

```ts
private static actionsMap = {
  "On Change": clActionOnChange,
  "Save": clActionSave,
  "Submit": clActionSubmit,
}
```

Example usage:

```ts
clActionFactory.createAction("Save", data);
```

Which creates:

```
new clActionSave()
```

## 5. Composition

**Composition** means a class uses other classes to perform part of its work.

Instead of extending everything through inheritance, classes **delegate responsibilities to helper components**.

### Use it when

* A class depends on other services
* Logic should be modular
* You want flexible architecture

### Common Syntax

```ts
this.dataType = clDataTypeFactory.createDataType(ldRow.data_type, this);
```

Here `clAction` uses another factory class.

### Real LATP Use Case

Inside `clAction.executeAction()`:

```ts
this.dataType = clDataTypeFactory.createDataType(ldRow.data_type, this);

this.checkFieldValue();
this.checkFieldProperties();
```

Architecture:

```
clAction
│
├── clDataTypeFactory
│      ├── Text
│      ├── Int
│      └── Float
│
└── clPropertiesFactory
       ├── Required
       ├── ReadOnly
       └── Hidden
```

The action class delegates validation logic to these components.

---

