---
title: Installation Guide - LENS AI Test Pilot
description: Step-by-step guide to install and set up LENS AI Test Pilot.
---

### Installation Guide - LENS AI Test Pilot

**Step 1:** Clone the repository  
Clone the repo using this command:  
```
git clone https://github.com/lmnaslimited/lens_ai_test_pilot/tree/develop
```

**Step 2:** Install dependencies  
Use the following commands to install the required dependencies:  
```
nvm use v20
npm install
```

**Step 3:** Run the setup command  
Run this command in the VS Code terminal to set up the project:  
```
npm run setup
```

**Step 4:** Verify Host Site  
Go to the Host URL and check for the following Doctypes:

- Test Case Configurator
- Site Details
- Test Fields

Make sure that these Doctypes are accessible. Then, proceed to add the necessary site details.

**Step 5:** Upload test data  
Run the following command to upload the test data to the site:  
```
npm run upload_testdata
```

**Step 6:** Open Cypress  
Run the following command to open Cypress:  
```
npx cypress open
```