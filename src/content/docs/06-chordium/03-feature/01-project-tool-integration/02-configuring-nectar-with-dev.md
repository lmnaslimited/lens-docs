---
title: Manual - Configuring Nectar Project with Developer Machine
description: Link the Project Module from Nectar with your local developer machine using Chordium.
---

This guide explains how to configure the **Nectar Project Module** with your developer machine using **Chordium**.

---

### Prerequisites

Before you begin, make sure you have:

- **Nectar user credentials** with **read permission** to the Project Module.
- **Basic Auth** details for the Nectar account.
- **Node.js version 20 or higher**  
  > Tip: We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.
- **Clone of the `lenscloud` repository**:  
  [https://github.com/lmnaslimited/lens_ai_test_pilot.git](https://github.com/lmnaslimited/lens_ai_test_pilot.git)

---

### Setting up `lenscloud` (Chordium CLI) locally

Since **Chordium** is not yet published, you must run it locally from the `lenscloud` repository.

```bash
# 1. Clone the repository
git clone https://github.com/lmnaslimited/lens_ai_test_pilot.git

# 2. Navigate to the folder
cd lens_ai_test_pilot

# 3. Install dependencies
npm install
```
> Now you are ready to use Chordium command anywhere in your machine

### Running the Configuration Command

To start the setup process, open a terminal and run:

```bash
lenscloud config
```

You’ll see a menu like this:

```text
? What do you want to do? (Use arrow keys)
❯ Set/Edit Configuration
  View Configuration
  Delete Configuration
```

🔹 Option 1: Set/Edit Configuration

Choose this option to create or update your configuration.

Example:
```bash
? What do you want to do? Set/Edit Configuration
? Enter the Nectar Application URL: https://nectar.lmnas.com
? Enter API Access Key: *****************
? Enter Git Personal Access Token: ******************************
✔ Configuration saved successfully!

```

What each input means:

- Nectar Application URL – The web address of your Nectar instance.

- Nectar User's Basic Auth – Got using API Key and API Secret.

- Git Personal Access Token – Used for Git operations (create one with repo permissions if working with private repos).

🔹 Option 2: View Configuration

Choose this to see your current settings.

Example:

```text
? What do you want to do? View Configuration
{
  "project_management_site": "https://nectar.lmnas.com",
  "api_key": "********",
  "git_pat": "********"
}
```
> **Note**: Sensitive values like API keys and tokens will be masked in the display.

🔹 Option 3: Delete Configuration

Choose this to remove your saved settings and start fresh.

Example:

```text
? What do you want to do? Delete Configuration
✔ Configuration deleted successfully!
```

### Example Full Setup Flow
1. Open a terminal.

2. Run:

```bash

lenscloud config
```
3. Select Set/Edit Configuration.

4. Enter your Nectar details and Git token.

5. Once saved, try:

```bash
lenscloud project use
```
> If everything is configured correctly, you’ll see a list of your Nectar projects ready to sync.
