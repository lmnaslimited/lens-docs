---
title: Strapi Data Manipulation (Without UI)
---

 **Overview**

This guide walks you through a **developer-friendly workflow** to create or update entire Strapi content entries using **Postman/Hoppscotch** and **LLMs (e.g., ChatGPT)** instead of relying on the Strapi UI. This approach is ideal when:

-   Creating new content programmatically.
    
-   Bulk updating translated versions.
    
-   Reducing manual UI effort for structured content.
    

> ⚠️ Not suitable for editing a **single field** — this is optimized for whole-structure content creation/modification.


**Prerequisites**

-   Access to your Strapi environment (local/staging/prod).
    
-   Access to [LMNAs Turbo Repo](https://github.com/lmnaslimited/lmnas-turbo).
    
-   Postman or Hoppscotch.io installed or accessible.
    
-   Admin access to Strapi (make sure permissions are enabled for content manipulation via API).
    
-   GraphQL plugin enabled on Strapi.
    


 **Steps**

 ### **1. Choose the Content Type**

Decide which content type you want to work with:

-   **Single Types** – Global configuration, About Us, etc.
    
-   **Collection Types** – Case Studies, Blog Posts, Testimonials, etc.
    


### **2. Get the Query Structure**

To understand the shape of the data to send or receive, get the query structure:

#### Option A: Use GraphQL Playground (Strapi Localhost)

-   Navigate to: `http://localhost:1337/graphql`
    
-   Use the visual query builder to construct the query.
    

#### Option B: Use LMNAs Turbo Query Definitions

-   Navigate to [LMNAs Turbo `query.ts`](https://github.com/lmnaslimited/lmnas-turbo/blob/main/packages/middleware/src/api/query.ts)
    
-   Copy the query structure for your required content-type.
    


### **3. Use an LLM to Generate JSON from Your Content**

Once you have the query structure, you can ask an LLM to generate the content structure in **JSON format**.



###  Note on Input Content Format

> ⚠️ **The content you provide to the LLM does _not_ have to be in a structured format like field:value.**
> 
> You can use:
> 
> -   Paragraphs
>     
> -   LinkedIn-style posts
>     
> -   Rough drafts
>     
> -   Even a brainstorming note
>     

The LLM will use the **query structure** as a target format and **transform your unstructured content into the required JSON**.

----------

###  Prompt Example with Natural Content Input

```text
You are a structured JSON generator. Use the GraphQL query format and convert the below rough content draft into the expected JSON.

Query:
```graphql
query CaseStudies {
  caseStudies {
    slug
    name
    pdfName
    heroSection {
      tag
      header {
        title
        subtitle
      }
      image {
        source
      }
      buttons {
        label
        href
        formMode
      }
    }
  }
}

```

Rough Draft:  
SwiftFlow Distributors is one of our standout clients. We helped them use LENS to scale their distribution operations with AI. The results were impressive — they saw reduced human error and better margins.

Their case study is titled "Scaling Distribution with AI" and is available as a downloadable PDF (`swiftflow.pdf`). The cover image is available at `/uploads/swiftflow_cover.png`. We tagged this as a Featured Case.

You can read more at /case-studies/swiftflow-distributors or use the button labeled “Read More” which links to that.


### 4. To translate the Content

If you need the same content in another language (e.g., German `de`):

####  Prompt Template for Translation
```

Translate the following JSON content into German (`de`). Preserve the structure, only translate string values.

Input:
{
  "slug": "swiftflow-distributors",
  "name": "SwiftFlow Distributors",
  "pdfName": "swiftflow.pdf",
  "heroSection": {
    "tag": "Featured Case",
    "header": {
      "title": "Scaling Distribution with AI",
      "subtitle": "How SwiftFlow used LENS to increase margin and reduce errors"
    },
    "image": {
      "source": "/uploads/swiftflow_cover.png"
    },
    "buttons": [
      {
        "label": "Read More",
        "href": "/case-studies/swiftflow-distributors",
        "formMode": "link"
      }
    ]
  }
}

```

### **5. Use Postman / Hoppscotch to Push the Data**

Now, you can use **REST API** endpoints to add or update data.

> Make sure required permissions are enabled in Strapi for **Create**, **Update**, **Read** operations.

####  A. Create a New Entry (`POST`)

-   **Method**: POST
    
-   **URL**: `http://localhost:1337/api/case-studies`
        
-   **Body**:
    

```json
{
  "data": {
    "slug": "swiftflow-distributors",
    "locale": "en",
    "name": "SwiftFlow Distributors",
    "pdfName": "swiftflow.pdf",
    "heroSection": {
      "tag": "Featured Case",
      "header": {
        "title": "Scaling Distribution with AI",
        "subtitle": "How SwiftFlow used LENS to increase margin and reduce errors"
      },
      "image": {
        "source": "/uploads/swiftflow_cover.png"
      },
      "buttons": [
        {
          "label": "Read More",
          "href": "/case-studies/swiftflow-distributors",
          "formMode": "link"
        }
      ]
    }
  }
}

```

####  B. Update an Existing Entry / Add Translation (`PUT`)

-   **Method**: PUT
    
-   **URL**: `http://localhost:1337/api/case-studies/<documentId>`  
    _(You can get the documentID from a GET request)_
    

To add a German translation (`de`), set `locale` to `"de"` and modify fields:

-   **URL**: `http://localhost:1337/api/case-studies/<documentId>?locale=de`  

```json
{
  "data": {
    "locale": "de",
    "name": "SwiftFlow Vertriebsunternehmen",
    "heroSection": {
      "tag": "Fallstudie",
      "header": {
        "title": "Skalierung des Vertriebs mit KI",
        "subtitle": "Wie SwiftFlow mit LENS die Marge steigerte und Fehler reduzierte"
      },
      "buttons": [
        {
          "label": "Mehr erfahren",
          "href": "/de/fallstudien/swiftflow-vertrieb",
          "formMode": "link"
        }
      ]
    }
  }
}

```

> Refer to [Strapi's REST API Docs](https://docs.strapi.io/dev-docs/api/rest) for detailed behavior of POST, PUT, and localization handling.

----------

##  Notes

-   Ensure **content-type permissions** (Settings → Roles → Public/Authenticated → Permissions) are enabled for the required endpoints.
    
-   Use a **custom token** for secure write operations if needed.
    
-   Test locally before pushing to staging/production.
    


