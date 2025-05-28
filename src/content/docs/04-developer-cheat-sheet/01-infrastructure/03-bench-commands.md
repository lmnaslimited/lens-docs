---
title: Bench Commands
---

# Fixtures Bench command
Generate a `.json` file containing the data and settings you want to migrate

**Pre-requisite**
defined the fixtures in hook file of the custom app

**Basic Syntax**
```
bench export-fixtures --site <sitename>
```
**Common Use Cases**
```
bench export-fixtures --site dev.localhost
```

**Sample Output**
A custom_field.json file will be created in the path <custom_app>/<custom_app>/fixtures