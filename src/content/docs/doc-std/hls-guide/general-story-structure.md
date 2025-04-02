---
title:  General Story Structure 
---

Standardized documentation ensures clarity, consistency, and seamless collaboration across teams. This guide provides a **general structure** for writing all types of technical stories, including **Issue Stories, Automation Stories, POC Stories, and Testing Stories**.  

---

## How to Write the Requirement  

A well-defined requirement should **clearly describe the functionality, feature, or fix** that needs to be implemented. It should address:  

- **Who is requesting the feature?** (Role: Developer, User, Admin, etc.)  
- **What needs to be done?** (Feature, bug fix, enhancement, etc.)  
- **Why is this needed?** (Business value, user impact, etc.)  

**"As a [role], I want to [feature or change] so that [benefit or impact]."**  

**For example:** 

"As a Customer Support Agent, I want to generate a PDF report of user complaints so that I can easily share it with the management team for analysis."

---

## Definition of Done  

The Definition of Done ensures the completeness of a feature, bug fix, or implementation. It should be structured in a **Given-When-Then** format:  

**For example:**  

- **Given** the input values or the development,  
  **When** I run or change this field,  
  **Then** it should perform the expected operation and update the corresponding data.  

- **Given** a user submits an invalid email format,  
  **When** they try to save the form,  
  **Then** an error message should be displayed, and the form should not be submitted.  

- **Given** an API endpoint,  
  **When** a request is sent with the correct parameters,  
  **Then** it should return the expected response with a 200 status code.  

---

##  High-Level Solution (HLS)  

The **High-Level Solution (HLS)** provides an architectural overview of the solution. It should focus on the bigger picture—how the implementation integrates into the existing system and what changes are required.  

### How to Write a High-Level Solution  

1. **Prerequisites**  
   - Clearly mention any dependencies, configurations, or setups needed before starting development.  
   - Specify required permissions, access, or environment configurations.  

2. **Architecture Diagram**  
   - Include a **sequence diagram** or **flow diagram** to visualize system interactions.  
   - Highlight key components, services, and integration points.  

3. **Steps to Solve the Issue / Approach**  
   - Define a **step-by-step plan** for implementing the solution.  
   - Identify affected services, dependencies, and required modifications.  
   - Explain how the solution will ensure **scalability, security, and performance**.  

4. **Reference Materials**  
   - Provide links to **existing documentation**, related issues, API references, or database schemas.  

5. **Where to Develop the Code**  
   - Mention the **specific service, module, repository, or branch** where the code changes will be implemented.  

---

##  Low-Level Solution (LLS)  

The **Low-Level Solution (LLS)** provides a detailed, technical breakdown of the implementation, including actual code changes, database updates, and testing output.  

### How to Write a Low-Level Solution  

1. **Git Reference**  
   - Specify the **repository name**, **branch**, and **commit hash**.  
   - Include the **pull request (PR) link** for review.  

2. **Code Snippet / Algorithm**  
   - Include **actual code changes** in the relevant programming language.  
   - If applicable, provide an **algorithmic approach** before implementing the code.  

   **Example:**  

   ```python
   def generate_report(user_id):
       """
       Generates a PDF report for a user's complaints.
       """
       complaints = fetch_complaints(user_id)
       if not complaints:
           return "No complaints found."

       pdf = create_pdf(complaints)
       save_report(user_id, pdf)
       return pdf

