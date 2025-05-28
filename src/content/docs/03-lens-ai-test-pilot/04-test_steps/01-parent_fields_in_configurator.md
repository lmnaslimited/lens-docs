---
title: Fields in Test Case Configurator
description: Detailed explanation of the fields in the Test Case Configurator used in LENS AI Test Pilot.
---


The **Test Case Configurator** in LENS AI Test Pilot has multiple fields that are organized into two main sections: **Details** and **More Info**. Below is a detailed explanation of each field within these tabs.

### **Details Tab**

#### 1. **Sequence**

- **Type**: Integer (int)
- **Description**: The **Sequence** field accepts a number and specifies the order in which the test case should run.
- **Usage**: This field defines the execution order of test cases. The lower the number entered, the earlier the test case will be executed. The sequence helps in managing and organizing the testing process, especially when you have multiple tests that need to be executed in a specific order.

#### 2. **Depends On**

- **Type**: Integer (int)
- **Description**: The **Depends On** field is used to specify any dependencies between test cases. It accepts an integer where you provide the sequence number of the test case that needs to run before the current test case.
- **Usage**: This is useful when one test case relies on the execution of another test case. If a test case depends on another, you must enter the **Sequence** number of the dependent test case here.
- **Note**: The **Depends On** field is **mandatory** when the **Sequence** field is specified. This ensures that dependencies are respected during the execution of test cases.

#### 3. **Site Name**

- **Type**: Text (string)
- **Description**: The **Site Name** field is where you specify the name of the site for which the test script will be generated.
- **Usage**: Enter the name of the **Host Site** (the site where the test scripts will be executed). This helps associate the generated test script with the correct site for testing.

#### 4. **Doctype to be Tested**

- **Type**: Dropdown
- **Description**: The **Doctype to be Tested** field is a dropdown menu where all available Doctypes from the selected site are fetched.
- **Usage**: From the dropdown, you can choose the specific Doctype that you want to test. This allows you to focus the test on a particular document type present in the Host Site.
- **Note**: The available Doctypes will be fetched from the Host Site and displayed in the dropdown, allowing you to easily select the one you wish to test.

---

### **More Info Tab**

#### 1. **Client Name**

- **Type**: Text (string)
- **Description**: The **Client Name** field is used to specify the name of the client associated with the site.
- **Usage**: This field is helpful when there is a need to identify or filter test cases based on the client. You can enter the client's name here to associate the test case with a specific client in the system.

#### 2. **JSON Response**

- **Type**: JSON (text field)
- **Description**: The **JSON Response** field is used to capture and return all fields from the selected Doctype in JSON format.
- **Usage**: This field fetches and displays all the fields of the selected Doctype in a structured JSON format, which can then be used for further validation or processing. This is useful when you need to validate the structure and values of fields within a Doctype during the testing process.

---

By understanding and properly configuring these fields, you can effectively create, manage, and execute automated tests with LENS AI Test Pilot, ensuring a smoother and more efficient testing process.
