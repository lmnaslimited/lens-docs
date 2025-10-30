### How to Prompt the User to Select a Branch (Interactive CLI)
---
Used to **allow users to select a branch** from a list of available branches interactively via the command line.

**Prerequisite:**
- Ensure you have **Node.js** installed on your system.
- Install the `inquirer` package if not already added:
  ```bash
  npm install inquirer
  ```
- This function is typically used in **CLI tools** or **automation scripts** that require user input.

---

**Basic Syntax:**
```typescript
async function fnPromptSelectBranch(iaBranches: string[]): Promise<string> {
  const ldAnswers = await inquirer.prompt([
    {
      type: "list",
      name: "selectedBranch",
      message: "Select the base branch",
      choices: iaBranches,
      loop: false
    }
  ]);
  return ldAnswers.selectedBranch;
}
```

- `iaBranches`: An array of branch names to display as selectable options.
- The function uses **`inquirer.prompt()`** to render a command-line selection list.
- It returns a **Promise** that resolves to the branch name chosen by the user.

---

**Common Use Case:**
Used when a script or automation process needs the user to choose a **base branch** (e.g., before creating a feature branch or merging changes).

```typescript
const branches = ["main", "develop", "release/v1.0"];
const selectedBranch = await fnPromptSelectBranch(branches);
console.log(`Selected base branch: ${selectedBranch}`);
```

---

**Sample Output (CLI Interaction):**
```
? Select the base branch (Use arrow keys)
❯ main
  develop
  release/v1.0
```

If the user selects **develop**:
```
Selected base branch: develop
```

---

**Note:**  
- This function uses **async/await**, so ensure it is called inside an asynchronous context.  
- The prompt will pause script execution until the user selects a branch.  
- Ideal for **interactive scripts**, **DevOps tools**, and **version control helpers**.
