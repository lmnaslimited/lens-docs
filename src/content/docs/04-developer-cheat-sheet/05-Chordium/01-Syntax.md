# How to Prompt a User to Select from a List in CLI

Used to **interactively get user input** by displaying a selectable list of options in the terminal. This is commonly used in CLI-based tools, scripts, or automation flows to collect user choices easily.

----------

## Prerequisite

-   Ensure **Node.js** is installed.
-   Install the **Inquirer** package:

```bash
npm install inquirer

```

----------

## Basic Syntax

```typescript
import inquirer from "inquirer";

const ldAnswers = await inquirer.prompt([
  {
    type: "list",
    name: "lSelectedValue",
    message: lMessage,
    choices: laChoices
  }
]);

console.log(ldAnswers.lSelectedValue);

```

----------

## Parameters

| Parameter    | Type       | Description                                                      |
|--------------|------------|------------------------------------------------------------------|
| `type`       | `string`   | Type of prompt. Use `"list"` for selectable list.               |
| `name`       | `string`   | Key name to access the selected value (e.g., `"lSelectedValue"`). |
| `laChoices`  | `string[]` | Array of options to display in the prompt list.                 |
| `lMessage`   | `string`   | Message/question displayed to the user before the list.         |
----------

## Example

```typescript
const laFruits = ["Apple", "Banana", "Cherry", "Mango"];

const ldSelectedFruit = await inquirer.prompt([
  {
    type: "list",
    name: "lSelectedValue",
    message: "Choose your favorite fruit:",
    choices: laFruits
  }
]);

console.log("Selected Fruit is:", ldSelectedFruit.lSelectedValue);

```

----------

## Sample CLI Output

```
? Choose your favorite fruit:
❯ Apple
  Banana
  Cherry
  Mango

```

If the user selects **Apple**, the console displays:

```
Selected Fruit is: Apple

```
