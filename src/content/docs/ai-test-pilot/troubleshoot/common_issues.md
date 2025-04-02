---
title: Common Issues and Solutions
description: A guide to solving common issues encountered during development, including Cypress file extension errors, CORS errors, and missing doctypes in the host site.
---


**Issue:**
When working with Cypress and TypeScript, you might encounter an error related to the `.ts` (TypeScript) file extension. This error typically occurs because Cypress doesn't recognize or properly handle the TypeScript configuration in the default setup.

**Solution:**
To resolve this issue, you need to update the TypeScript configuration in your project.

- **Step 1:** Locate the `tsconfig.json` file in your project root.
- **Step 2:** Find the `compilerOptions` section, and change the `module` option from `commonjs` to `esnext`.

Here is an example of how your `tsconfig.json` file should look:

<!-- ```json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es6",
    "strict": true,
    "esModuleInterop": true
  }
} -->


## 2. CORS Error While Testing Locally

**Issue:**  
If you're testing locally and encounter CORS (Cross-Origin Resource Sharing) errors, this issue might be due to the target site not allowing your local development environment to make requests to it.

**Solution:**  
To resolve this issue, you need to adjust the CORS configuration on the target site where your tests are being run.

- **Step 1:** Go to the target site's configuration file, which can usually be found at `sites/{your-site}/site_config.json`.
- **Step 2:** Add or modify the CORS settings to allow requests from your local environment.

For example, you can set `cors` to `"*"` to allow requests from all origins:

```json
{
  "cors": "*"
}

## 3. Not Getting Doctypes in Host Site

**Issue:**
Sometimes, when you're working with ERPNext or Frappe, you may not see the expected doctypes in the host site. This could be due to incorrect configuration or missing settings.

**Solution:**
To fix this issue, you need to adjust the `basic` key in the site configuration file.

- **Step 1:** Open the `sites/{your-site}/site_config.json` file.
- **Step 2:** Look for the `basic` key in the file, which is responsible for including essential configurations for the site.
- **Step 3:** Make sure the `basic` key is correctly defined. If it's missing or incorrect, you may need to add or correct it.

For example:

```json
{
  "basic": {
    "enable_doctypes": true
  }
}
