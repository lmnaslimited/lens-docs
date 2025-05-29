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


### generateMetadata()
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



## generateViewport()
---

Used to **dynamically set the `<meta name="viewport">` tag**, which controls how your site is displayed on different screen sizes and devices.
  
**Basic Syntax:**
```js
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  //viewport fields
}
```
**Viewport Fields**
| Property       | Type      | Description                                                                                          |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `width`        | `string`  | Sets the viewport width (e.g `'device-width'`, `'1024'`)                                          |
| `height`       | `string`  | Viewport height (not widely supported) (e.g `'device-height'`, `'768'`)  *(Rare)*            |
| `initialScale` | `number`  | Zoom level when the page loads (e.g `1`, `0.75`, `1.5`)                                           |
| `minimumScale` | `number`  | Minimum zoom level (e.g `0.1` to `10`)                                                            |
| `maximumScale` | `number`  | Maximum zoom level (e.g `0.1` to `10`)                                                            |
| `userScalable` | `boolean` | Whether zooming is allowed (`true` or `false`)                                                      |
| `viewportFit`  | `string`  | Controls layout for devices with notches (e.g `'auto'`, `'contain'`, `'cover'`)                |
| `themeColor`   | `string`  | Sets browser UI theme color, affecting mobile address bar (e.g `'#ffffff'`, `'transparent'`)     |


**Common Use Case:**
Set a standard responsive viewport for mobile devices:

```js
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```
**Sample Output :**

The page `<head>` includes:
```js
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
```

**Note:**
-   You can define it inside `layout.js` or `page.js` depending on whether you want a global or per-page viewport configuration.
-   `generateViewport()` is **server-side only** (works only in Server Components).





## useState()
---

Used to **add state management to functional React components**, allowing components to hold and update local state.

>  `useState` **works only on the client side** so be sure to add `"use client";` directive at the top of your component file.

  
**Basic Syntax:**
```js
"use client";

import { useState } from 'react';

const [state, setState] = useState(initialValue);
```

| Parameter    | Description                                  |
| ------------ | -------------------------------------------- |
| `state`      | The current value of your state variable     |
| `setState`   | Function to update the state variable        |
| `initialValue` | The initial value assigned to the state variable |


**Common Use Case:**
Create a counter that increments when a button is clicked:

```js
"use client";

import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}
```
**Sample Output :**

-   Initially shows:  
    `Count: 0`
    
-   After clicking button 3 times:  
    `Count: 3`




## useEffect()
---

The `useEffect` hook is used to **handle side effects** in functional React components. Common use cases include **data fetching**, **event listeners**, **DOM manipulation**, and **timers**, etc.

>  `useEffect` **works only on the client side** so be sure to add `"use client";` directive at the top of your component file.

  
**Basic Syntax:**
```js
"use client";

import { useEffect } from 'react';

useEffect(() => {
  // side effect logic here
  return () => {
    // optional cleanup logic
  };
}, [dependencies]);
```

| Argument       | Type       | Description                                                                                         |
|----------------|------------|---------------------------------------------------------------------------------------------------|
| `callback`     | `function` | The effect function containing side-effect logic. Can optionally return a cleanup function.       |
| `dependencies` | `array`    | An array of dependencies that trigger the effect to re-run when their values change. Use `[]` to run once on mount. |



**Common Use Case:**
Log a message to the console when the component mounts:
```js
"use client";

import React, { useEffect } from 'react'

function Logger() {
  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return <p>Check your console</p>
}
```
**Sample Output :**

-   On component mount:  
    `Component mounted`
    
-   On component unmount:
    `Component unmounted`



## Dynamic Layouts (App Router)
---

Used to **define custom layout structures for specific route segments** . This allows you to apply different headers, sidebars, or page structures depending on the route.

**Folder Structure Example:**
```
app/
│
├── dashboard/
│   ├── layout.tsx       ← Layout specific to /dashboard/*
│   └── page.tsx         ← Main dashboard page
|
└── layout.tsx           ← Root layout (wraps everything)
```

-   The **root `layout.tsx`** is the top-level layout that defines the overall structure of your app.
    
-   The **`dashboard/layout.tsx`** wraps all routes under `/dashboard` — for example:  `/dashboard`, `/dashboard/settings` etc.

**Common Use Case:**
For example, to create a layout for the `/blog` route, add a new `layout` file inside the `blog` folder.

```js
// app/layout.tsx
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>Global Header</header>
        <main>{children}</main>
        <footer>© 2025 All Rights Reserved</footer>
      </body>
    </html>
  )
}
```

```js
// app/blog/layout.tsx
import React from 'react'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Blog Header</header>
      <main>{children}</main>
    </div>
  )
}
```

When a user visits `/blog`, the `BlogLayout` **is nested inside** the `RootLayout`.

