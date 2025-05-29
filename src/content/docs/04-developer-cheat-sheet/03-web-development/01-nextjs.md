---
title: Web Development - Nextjs
---

### API Calling in the Client Side (App Router)
---
Use `fetch()` to call APIs written in the App Router directly from client components.

**Pre-requisite**
API must be defined under the following structure:
app/
├── api/
│   └── apiName/
│       └── route.ts

**Basic Syntax**

 - In Asynchronous
```javascript
await fetch('api/apiName')
```
 - In synchronous
  ```javascript
fetch('api/apiName')
```

Note:

 - **Asynchronous calls** are recommended for data fetching in client components for smooth user experience.

**Common Use Cases**

Call a contact API (from `src/app/api/contactApi/route.ts`) **without parameters** on component mount

```javascript
useEffect(() =>{
async function fnFetchContact(){
	const LdContact = await fetch('api/contactApi') //call the contactApi
	const LdResult = await LdContact.json()
	console.log(LdResult)
}
fnFetchContact()
},[])
```
**Sample Output**
```
{
data: {"name": "John Doe", "email": "john@example.com"},
message: "contact created Successfully
}
```

**Call a Contact API **with parameters** (e.g., `email`) on component mount**

```javascript
useEffect(() =>{
async function fnFetchContact(){
	//passing the Email id(xyz@example.com)
	const LdContact = await fetch(`api/contactApi?email=${Email}`) 
	const LdResult = await LdContact.json()
	console.log(LdResult)
}
fnFetchContact()
},[])
```
**Sample Output**
```
{data: {"name": "John Doe", "email": "xyz@example.com"},
message: "contact created Successfully
}
```

### Get the Dynamic route segment in client component
---
Use `useParams()` to access dynamic segments of the current URL in the client component.
Ex: folder structure of the nextjs app
```text
app/
├── [locale]/
│   └── products/
│       └── [slug]/
│           └── page.tsx
```
**Basic Syntax**

```javascript
const LdParam = useParam()
```
**Common Use Cases**
Note: you can access n number of dynamic segments based on the name you have provided like we did ([locale], [slug])
```javascript
//to get the current locale(langauage)
console.log("language:",LdParam.locale)
//to get the current product name i.e slug id
console.log("slug:", LdParam.slug)
```
**Sample Output**
on browser, Visit "https://<sitename>/en/products/lens-erp-suite"
```
language:"en"
slug:"lens-erp-suite"
```


### Conditional Rendering: Logical AND (&&) and Ternary Operator
---
Helps you show/hide content based on **props, state, route params, session status**, etc.

**Using && (logical AND)**
```
{condition && <Component />}
```
**Using Ternary Operator**
```
{condition ? <ComponentIfTrue /> : <ComponentIfFalse />}
```

| Options   |  Description       |
| --------- | -------------------|
| `&&` (AND) |   Renders the component only if condition is true       |
| `? :` (ternary)  |   Renders one of two components based on condition      |

**Common Use Case:**
Displaying message based on user login status
```javascript
'use client'

import { useState } from 'react'

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      {loggedIn ? <p>Welcome back!</p> : <p>Please log in!</p>}
    </div>
  )
}
```
**Sample Output:**

Output when `loggedIn = true`:

```
Welcome back!
```


Output when `loggedIn = false`:

```
Please log in!
```


### `generateMetadata()` 
---

Used to **dynamically set page metadata** like title, description, and social tags for better SEO and sharing.
  
**Basic Syntax:**
```javascript
export async function generateMetadata() {
  return {
    title: 'Your Page Title',
    description: 'Your Page Description',
    // Optional: Add more fields like openGraph, twitter, etc.
  }
}
```

| parameters   |  Description       |
| --------- | -------------------|
| params|    Contains dynamic route values (e.g., from `[slug]` or `[id]`)    |
| searchParams|   Contains query parameters (e.g., `?sort=asc`)     |


**Common Use Case:**
Sets the page metadata dynamically based on the blog post slug:
If the path is:``` app/blog/[slug]/page.js ```
and you visit the URL:  ```blog/my-first-post```
then ```params.slug = 'my-first-post'```
```javascript
export async function generateMetadata({ params }) {
  const post = await fetchPostBySlug(params.slug)  
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```
**Sample Output :**
If the fetched post is:
```
{
  "title": "My First Post",
  "excerpt": "This is a summary of my first post."
}
```
Then the page `<head>` includes:

```javascript
<head>
  <title>My First Post</title>
  <meta name="description" content="This is a summary of my first post." />
</head>
```
**Note:**
-   You can define metadata in both `layout.js` and `page.js`.
-   Next.js automatically injects metadata into the page’s `<head>`.  
-   `generateMetadata()` is **server-side only** (works only in Server Components).