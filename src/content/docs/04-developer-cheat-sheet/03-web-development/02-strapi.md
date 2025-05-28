---
title: Web Development - Strapi
---


## How to Write a GraphQL Query for a Single Content Type 
Used to **fetch a single entry** (a unique object) from your LCMS.

**Prerequisite:**
-   Make sure your LCMS (Strapi) is running.
-   Open your browser and go to:  
    `http://localhost:1337/graphql`  
    Here, you will see **GraphQL Playground** where you can write and test your queries.
    
**Basic Syntax:**
```
query QueryName{
  contentTypeName {
    field1
    field2
    nestedField {
      subField1
    }
  }
}
```
- `QueryName`: Can be **any valid query name** you choose (e.g., `GetHomeData`, `FetchProfile`). It is optional but useful for naming your queries.
-   `contentTypeName`: The name of your single content type in **lowercase** (e.g., `homepage`, `profile`).
    
-   Inside `{}`, list the fields you want returned.
    
-   You can nest fields if your content has related objects.

**Common Use Case:**
Suppose your GraphQL schema has a single content type called `home` with these fields:

-   `id`
    
-   `title`
    
-   `description`
    
-   `bannerImage` (object with field `url`)

```
query Home{
  home {
    title
    description
    bannerImage {
      url
    }
  }
}
```
**Sample Output :**

```
{
  "data": {
    "home": {
      "title": "Welcome to Our Website",
      "description": "We provide awesome services.",
      "bannerImage": {
        "url": "https://example.com/banner.jpg"
      }
    }
  }
}
```
**Note:**  Queries return exactly the fields you specify — no more, no less


## How to Write a GraphQL Query for a Collection Type
Used to **fetch multiple entries** (a list of objects) from your LCMS.

**Prerequisite:**
-   Make sure your LCMS (Strapi) is running.
-   Open your browser and go to:  
    `http://localhost:1337/graphql`  
    Here, you will see **GraphQL Playground** where you can write and test your queries.
    
**Basic Syntax:**
```
query QueryName{
  collectionTypeName {
    field1
    field2
    nestedField {
      subField1
    }
  }
}
```
- `QueryName`: Can be **any valid query name** you choose (e.g., `GetHomeData`, `FetchProfile`). It is optional but useful for naming your queries.
-   `collectionTypeName`: The **plural** name of your collection type in lowercase (e.g., `articles`, `posts`, `products`).
    
-   Inside `{}`, list the fields you want returned.
    
-   You can nest fields if your content has related objects.

**Common Use Case:**
Suppose your GraphQL schema has a collection type called `articles` with these fields:

-   `id`
    
-   `title`
    
-   `summary`
    
-   `author` (object with field `name`)

```
query Home{
  articles {
    id
    title
    summary
    author {
      name
    }
  }
}
```
**Sample Output :**

```
{
  "data": {
    "articles": [
      {
        "id": "1",
        "title": "GraphQL Basics",
        "summary": "An introduction to GraphQL...",
        "author": {
          "name": "John Doe"
        }
      },
      {
        "id": "2",
        "title": "Advanced GraphQL",
        "summary": "Deep dive into GraphQL features...",
        "author": {
          "name": "Jane Smith"
        }
      }
    ]
  }
}
```


## How to Write a GraphQL SubQuery by Combining Multiple Content Types

Used to **fetch data from multiple different content types** in a single query.

**Prerequisite:**
-   Make sure your LCMS (Strapi) is running.
-   Open your browser and go to:  
    `http://localhost:1337/graphql`  
    Here, you will see **GraphQL Playground** where you can write and test your queries.
    
**Basic Syntax:**
```
query QueryName{
  contentTypeOne {
    field1
    field2
  }
  contentTypeTwo {
    field1
    field2
  }
}
```
- `QueryName`: Can be **any valid query name** you choose (e.g., `GetHomeData`, `FetchProfile`). It is optional but useful for naming your queries.
-   `contentTypeOne` and `contentTypeTwo` are different content types in your schema.
    
-   You can fetch fields from multiple types side by side in one query.

**Common Use Case:**
Suppose you have two content types:

-   `caseStudies` (collection type)
    
-   `solution` (single type)

```
query Subquery{
  caseStudies {
    name
  }
  solution {
    name
  }
}
```
**Sample Output :**

```
{
  "data": {
    "caseStudies": [
      { "name": "Case Study 1" },
      { "name": "Case Study 2" }
    ],
    "solution": {
      "name": "Our Solution Name"
    }
  }
}
```


## How to Use Locale Argument in GraphQL Query

To fetch data in a specific language by passing the locale as an argument in your query.

**Prerequisite:**
-   Make sure your LCMS (Strapi) is running.
-   Open your browser and go to:  
    `http://localhost:1337/graphql`  
    Here, you will see **GraphQL Playground** where you can write and test your queries.
    
**Basic Syntax:**
```
query QueryName($locale: I18NLocaleCode) {
  contentType(locale: $locale) {
    field1
    field2
  }
}
```
**Variables:**
You need to pass the locale value as a variable:
```
{
  "locale": "locale code" 
}
```

**Common Use Case:**
Fetch industries data in the `"en"` (English) locale:

```
query Industries($locale: I18NLocaleCode) {
  industries(locale: $locale) {
    title
    subtitle
  }
}
```
**Variables:**

```
{
  "locale": "en"
}
```
**Sample Output :**

```
{
  "data": {
    "industries": [
      {
        "title": "Retail Industry",
        "subtitle": "Overview of retail sector"
      }
    ]
  }
}
```


## How to Use Filters Argument in GraphQL Query

To fetch data that matches specific conditions by passing the filters as an argument in your query.

**Prerequisite:**
-   Make sure your LCMS (Strapi) is running.
-   Open your browser and go to:  
    `http://localhost:1337/graphql`  
    Here, you will see **GraphQL Playground** where you can write and test your queries.
    
**Basic Syntax:**
```
query QueryName($filters: ContentTypeFiltersInput) {
  contentType(filters: $filters) {
	 field1
     field2
  }
}
```
**Variables:**
Need to pass the filter values as a variable:
```
{
  "filters": {
    "fieldName": {
      "operator": "value"
    }
  }
}
```

**Common Use Case:**
Fetch industries where the slug equals `"retail"`:

```
query Industries($filters: IndustryFiltersInput) {
  industries(filters: $filters) {
    title
    subtitle
  }
}
```
**Variables:**

```
{
  "filters": {
    "fieldName": {
      "operator": "value"
    }
  }
}
```
**Sample Output :**

```
{
  "data": {
    "industries": [
      {
        "title": "Retail Industry",
        "subtitle": "Overview of retail sector"
      }
    ]
  }
}
```
