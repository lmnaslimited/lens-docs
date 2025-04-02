---
title: High-Level Solution (HLS) - Issue Story 
---
  
This is a **HLS template for writing an Issue Story**, designed to document and resolve system issues efficiently. 

A **High-Level Solution (HLS)** should include:  
- **Problem Identification:** Clearly define the issue type and impact.  
- **Root Cause Analysis:** Explain why and how the issue occurs.  
- **Affected Functions & Components:** Specify the relevant code references.  
- **Solution Approach:** Outline steps to resolve the issue.  
- **Implementation & Deployment Details:** Provide Git references and testing strategies.  

## Issue Type  
Specify the type of issue and describe the problem category:  
- **Issue** – A general problem or bug found in the system.  
- **Change Request** – A request to modify existing functionality.  
- **Internal Issue** – An issue reported internally by the team.  
- **Problem** – A recurring issue that needs a long-term solution.  
- **Service Request** – A request for a new feature, support, or enhancement.  

Clearly mention what type of issue occurred and its impact.  

## How the Issue Occurs 
Provide details on **why and how the issue happens**, including the **root cause**:  
- What **caused** the issue (e.g., incorrect logic, configuration mismatch, system overload)?  
- How **frequently** does it occur?  
- Does it affect **specific environments** (e.g., occurs only in Production but works fine in Local)?  
- **Logs, screenshots, or error messages** (if available).  

## Functions You Want to Implement  
Mention the **Git reference and the function(s) to be modified**:  
- **Git Reference:** Provide the Git branch or commit where the issue was introduced.  
- **Function Path & Line Number:** Mention the exact file path and lines where the changes need to be made.  
  - Example: src/components/UserProfile.js - Line 120  
- **Affected Modules/Components:** List specific services, APIs, or UI components impacted by this issue.  

## Steps to Solve the Issue  
Describe the approach and **steps to resolve the issue**:  
1. **Analysis:** Identify the root cause and confirm the issue using debugging or logs.  
2. **Fix Implementation:** Explain what changes need to be made (code updates, configurations, or infrastructure changes).  
3. **Testing & Validation:** Mention how to test the fix (unit tests, integration tests, manual verification).  
4. **Deployment Strategy:** If applicable, state how the fix will be deployed (e.g., behind a feature flag, hotfix, or next release).  

## Git Reference  
Provide the **final Git details** after fixing the issue:  
- **Branch Name:** The branch where the fix is applied.  
- **Commit ID:** The commit hash of the fix.  
- **Merge Request/PR Link:** A link to the pull request.  
