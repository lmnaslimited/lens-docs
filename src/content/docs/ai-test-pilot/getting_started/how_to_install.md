---
title: Installation Guide - LENS AI Test Pilot
description: Step-by-step guide to install and set up LENS AI Test Pilot.
---

Follow these steps to install and set up **LENS AI Test Pilot**.

### 1. Clone the LENS AI Test Pilot Repository

The first step is to clone the **LENS AI Test Pilot** repository to your local machine.

- Open your terminal or command prompt and clone the repository to your local machine.
- Once the repository is cloned, navigate to the project directory where the files are located.

### 2. Open the Project in Your Code Editor

Once you have cloned the repository, open the project folder in your preferred code editor. You can use any code editor, but **Visual Studio Code** is recommended for its ease of use and great support for JavaScript and Node.js development.

### 3. Install Dependencies

After opening the project in your code editor, install all the required dependencies.

- Run the necessary command to install all the required libraries and packages. This ensures the system is set up with everything you need to run LENS AI Test Pilot smoothly.

### 4. Create the `.env` File

After installing the dependencies, you need to set up the **environment file** (`.env`), which contains important configuration settings for the Host and Target sites.

- Inside the project folder, you will find a sample `.env` file.
- Copy the contents of the sample file and create a new `.env` file in the same folder.
- In the `.env` file, you will need to provide the following information:

  - **HOST_URL**: The URL of the **Host Site** (this is where the testing will occur).
  - **HOST_KEY**: The API key for the **Host Site** (this key allows the tool to interact with the Host Site during testing).
  - **TARGET_URL**: The URL of the **Target Site** (this is where Doctype configurations will be set up).
  - **TARGET_KEY**: The API key for the **Target Site** (this key allows the tool to access and configure Doctypes on the Target Site).

Make sure you replace these placeholders with the actual values for your Host and Target sites. The `.env` file will look something like this:


### 5. Run the Setup Command

Once you have configured the `.env` file, it’s time to run the setup process. There is a simple command that will automate most of the setup for you:

- Open your terminal in the project directory.
- Run the following command: **npm run setup**


This command will:

1. Clone the **Test Case Configurator** repository.
2. Switch to the configurator directory.
3. Install all the required dependencies for the configurator.
4. Perform the necessary upload operation to configure the system.

After running the setup command, the tool will take care of these tasks automatically.

### 6. Verify and Test the Host Site

Once the setup is complete, you need to verify that everything is working properly:

1. Go to the **Doctype List** on the **Host Site**.
2. Look for the following Doctypes:
   - **Test Case Configurator**
   - **Site Details**
   - **Test Fields**
3. In the **Test Case Configurator** list, make sure that a **sample quotation test** is listed. This confirms that the test setup was successful.

---

By following these steps, you will have **LENS AI Test Pilot** installed and set up. You can now begin using it to automate testing and streamline your development process.
