---
title: Test Lab Functionality  
description: A detailed guide for running the Test Lab.  
---

## Test Plan

A **Test Plan** is a collection of test scripts along with the relevant master data. It defines the scope, approach, and resources required for testing.

## Test Lab

A **Test Lab** is a group of Test Plans. Test Plans can be added to a Test Lab either from the Task module or directly from the Test Plan interface. When Test Plans are added, their associated test scripts and master data are automatically included in the Test Lab.

## Run the Test Script

To execute a test script:

1. Provide the **Test Lab ID** in the `env` file.
2. The generator will create a **Test Run** for the specified Test Lab.
3. The associated test scripts will then be executed automatically.
