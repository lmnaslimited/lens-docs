---
title: Configurator Setup Guide
description: A detailed guide for setting up the Configurator.
---

This guide provides clear steps for setting up the Configurator to test a site with specific doctypes. Follow these instructions to correctly configure your testing environment.

## Step 1: Add Site Details

1. **Go to the Host Site**: Start by navigating to the host site.
2. **Search for the Site Details Doctype**: In the search bar, type in the "Site Details" doctype.
3. **Add a New Site Detail**: Click on "Add" to create a new entry for the site you want to test.
4. **Input the Site Name**: Enter the name of the site you want to test.
5. **Enter the Authorization Key**: Provide the basic authorization key for the site.
6. **Enter the Client Name**: Add the client name associated with the site.
7. **Select Doctypes to Test**: From the list, choose the doctypes you want to test for this site.
8. **Save the Site Detail**: Once all fields are completed, save the site details.


![Setting up Configurator](/lens_ai_test_pilot_docs/sitedetails.gif)

## Step 2: Add a Test Case Configurator

1. **Search for the Test Case Configurator List**: Look for the Test Case Configurator section.
2. **Click on Add Test Case Configurator**: This will open the form to add a new test case.
3. **Enter the Title**: Give your test case a descriptive title.
4. **Enter the Sequence Number**: Specify the order in which the test case should proceed. This helps in defining the flow if multiple test cases exist.
5. **Set "Depends On" Field**: If your test case depends on a previous test case, select the relevant field in the "Depends On" section.
6. **Select the Site Name**: From the dropdown, choose the site you added earlier in the Site Details Doctype.
7. **Choose the Doctype to Test**: Select the doctype that you wish to test from the dropdown menu.
8. **View the JSON Response**: After selecting the doctype, the "More Info" tab will automatically display the JSON response with all the fields.
9. **Save the Test Case Configurator**: Once everything is configured, save the test case.

![Setting up Configurator](/lens_ai_test_pilot_docs/configuration.gif)