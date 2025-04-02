---
title: Pre-requisites - LENS AI Test Pilot
description: Essential setup requirements for using LENS AI Test Pilot.
---

Before you begin using LENS AI Test Pilot, ensure the following prerequisites are met:

### 1. **Two Frappe Sites**

LENS AI Test Pilot requires two Frappe sites for the setup:

- **Host Site**: This is the Frappe site where you want to perform the testing. It will act as the "target" site where your automated test scripts will run and interact with the application to validate its behavior. This site will receive the test inputs and perform the test actions.
  
- **Target Site**: This is the Frappe site where you will configure the Doctype (document type). The setup of your Doctype and other configurations needed for testing will occur on this site. This site essentially holds the configuration and test setup details.

Both sites need to be properly set up and running. Ensure that the **Target Site** has the necessary Doctypes configured, and the **Host Site** is ready for testing. 

### 2. **API Key for Both Sites**

In order to establish communication between the two Frappe sites, API keys are required for both. These API keys will authenticate and authorize LENS AI Test Pilot to interact with the sites and execute test scripts.

- **API Key for Host Site**: 
  You will need to generate an API key for the **Host Site**. This key allows LENS AI Test Pilot to interact with the Host Site and perform actions such as triggering test scenarios and verifying responses.
  
- **API Key for Target Site**: 
  Similarly, an API key must be generated for the **Target Site**. This API key allows LENS AI Test Pilot to interact with the Doctype configuration, manage test cases, and make any necessary adjustments to the target site during testing.

#### Steps to Generate API Keys on Frappe:

1. Log in to the Frappe site as an **Administrator**.
2. Navigate to the **User** section under the **Settings** module.
3. Open your user profile and create a new **API key**.
4. Copy the generated API key for both the **Host Site** and the **Target Site**.
5. Use postman to get the Basic Key

These keys will be used by LENS AI Test Pilot to authenticate and authorize the interactions between both Frappe sites.

### 3. **Access Permissions**

For LENS AI Test Pilot to function effectively, the user accounts associated with both sites need to have the proper access permissions. These permissions ensure that LENS AI Test Pilot can interact with the sites and execute the required test actions without restrictions.

- **Administrator Access**: The user account must have **Administrator** access on both sites. This will allow you to configure the Doctypes on the Target Site and ensure that the tool can run tests on the Host Site.
  
- **API Access**: The API keys generated for both sites must have the necessary permissions to interact with the Frappe REST API. This includes creating, updating, and reading Doctype records and test data during execution.

- **Test Management Access**: The user must also have permissions to create, modify, and manage test cases, as this is necessary for defining, executing, and tracking tests during the process.

Once these access levels are granted, LENS AI Test Pilot will be able to perform actions on both sites, ensuring that the test automation process runs smoothly.

---

After meeting these prerequisites, you will be ready to begin using LENS AI Test Pilot to automate your testing process and interact with your Frappe sites.
