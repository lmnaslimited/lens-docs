---
title: Bench Commands
---

## Bench fixtures Command
Generate a `.json` file containing the data and settings you want to migrate

**Pre-requisite**
defined the fixtures in hook file of the custom app

**Command Syntax**
```
bench export-fixtures --site <sitename>
```
**Use Cases**
```bash
bench export-fixtures --site dev.localhost
```

**Sample Output**

A custom_field.json file will be created in the path <custom_app>/<custom_app>/fixtures

---
## Bench backup Command
* Use this command to take backup of the site.
* Run this command inside the backend container of your application.

**Command Syntax**
```
bench --site <site-name> backup
```
**Options**

| Options    | Description|
| --------- |------------------- |
| `--with-files`  | Backup along with public and private files |

**Use Case**

**1) Without Flag**
```bash
bench --site lenstest.lmnas.com backup
```
**Sample Output**
```bash
Backup encryption is turned on. Please note the backup encryption key.
Backup Summary for lenstest.lmnas.com at 2025-05-29 11:18:07.105285
Config  : ./lenstest.lmnas.com/private/backups/20250529_111752-lenstest_lmnas_com-site_config_backup-enc.json 282.0B
Database: ./lenstest.lmnas.com/private/backups/20250529_111752-lenstest_lmnas_com-database-enc.sql.gz         40.0MiB
Backup for Site lenstest.lmnas.com has been successfully completed
```

**2) With Flag**
```bash
bench --site lenstest.lmnas.com backup --with-files
```
**Sample Output**
```bash
Backup encryption is turned on. Please note the backup encryption key.
Backup Summary for lenstest.lmnas.com at 2025-05-29 11:21:50.643478
Config  : ./lenstest.lmnas.com/private/backups/20250529_112132-lenstest_lmnas_com-site_config_backup-enc.json 282.0B
Database: ./lenstest.lmnas.com/private/backups/20250529_112132-lenstest_lmnas_com-database-enc.sql.gz         40.0MiB
Public  : ./lenstest.lmnas.com/private/backups/20250529_112132-lenstest_lmnas_com-files-enc.tar               123.1MiB
Private : ./lenstest.lmnas.com/private/backups/20250529_112132-lenstest_lmnas_com-private-files-enc.tar       6.3MiB
Backup for Site lenstest.lmnas.com has been successfully completed with files
```
---
## Bench restore Command
* Use this command to restore the site with the backup files.
* Run this command inside the backend container of your application.

**Command Syntax**
```
bench --site <site-name> restore <path/to/backup-files> 
```
**Options & Flags**

|               | Type               | Description|
| --------------|------------------- |------------------- |
| `--force`     |    flag            | Ignore warnings |
| `--with-public-files`  | option | Restores the public files of the site|
| `--with-private-files`  | option |Restores the private files of the site |
| `--encryption-key`  | option | Pass Backup encryption key if the backup file is encrypted (Only use this when you find `enc` in the backup file names) |

**Use Case**

**1) Without force Flag**
```bash
bench --site lenstest.lmnas.com restore ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz

```
**Sample Output**
```bash
$ bench --site lenstest.lmnas.com restore ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz
MySQL root password:
Restoring Database for Site lenstest.lmnas.com...
Database backup found at ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz
Extracting...
Database successfully extracted
Installing database...
Rebuilding database lenstest_lmnas_com...
Database restored
Updating DocTypes for lenstest.lmnas.com        : [========================================]
Updating patched modules...
Backing up the newly restored database...
Backup complete
Site restored successfully.
```
**2) With force Flag**
```bash
bench --site lenstest.lmnas.com --force restore \
  ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz \
  --with-public-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-files.tar \
  --with-private-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-private-files.taz
```
**Sample Output**
```bash
MySQL root password:  

App frappe already installed  
*** Scheduler is enabled ***  
Site localhost has been restored with files
```
**3) With encrypted backup**
```bash
bench --site lenstest.lmnas.com --force restore \
  ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database-enc.sql.gz \
  --with-public-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-files-enc.tar \
  --with-private-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-private-files-enc.tar \
  --encrypted-key hgsdajhvfjwtef7363jkhajkfgj
```
**Sample Output**
```bash
Provide encryption key for decryption. Decrypting using the provided key
MySQL root password:  

App frappe already installed  
*** Scheduler is enabled ***  
Site localhost has been restored with files
```
---
## Bench migrate Command
* applies all pending patches and updates the database schema to match the current code.
* Run this command inside the backend container of your application.

**Command Syntax**
```
bench --site <site-name> migrate
```
**Use Case**
```bash
bench --site lenstest.lmnas.com migrate
```
**Sample Output**
```bash
Migrating lenstest.lmnas.com
Updating DocTypes for frappe        : [========================================] 100%
Updating DocTypes for payments      : [========================================] 100%
Updating DocTypes for erpnext       : [========================================] 100%
Updating Dashboard for frappe
Updating Dashboard for payments
Updating Dashboard for erpnext
Updating customizations for Address
Updating customizations for Contact
Queued rebuilding of search index for lenstest.lmnas.com
```
---
## Enabling scheduler in bench
* Commands to manage the scheduler and background jobs statuses for the sites on your bench.
* Run this command inside the backend container of your application.

**Command Syntax**
```
bench --site <site-name> enable-scheduler
```
**Use Case**
```bash
bench --site lenstest.lmnas.com enable-scheduler
```
**Sample Output**
```bash
Enabling scheduler for lenstest.lmnas.com
Scheduler enabled
```
---
## Disable scheduler in bench
* Commands to stop the scheduler and background jobs statuses for the sites on your bench.
* Run this command inside the backend container of your application.

**Command Syntax**
```
bench --site <site-name> disable-scheduler
```
**Use Case**
```bash
bench --site lenstest.lmnas.com disable-scheduler
```
**Sample Output**
```bash
Disabling scheduler for lenstest.lmnas.com
Scheduler disabled
```
---
## Enabling server script in Version-15 bench
> **Note:** Starting from version 15, Server Scripts are disabled by default.

**Command Syntax**
```bash
bench set-config -g server_script_enabled 1
```
---
## Bench Maintenance Mode Command
Enable or disable maintenance mode for a site to restrict user access during updates or maintenance activities.

**Command Syntax**
```
bench --site <sitename> set-maintenance-mode <on|off>
```
**Use Cases**
```bash
# Enable maintenance mode
bench --site dev.localhost set-maintenance-mode on

# Disable maintenance mode
bench --site dev.localhost set-maintenance-mode off
```

**Sample Output**

-   When **enabled**:  
    ![maintence-mode-off](/lens-docs/maintenance-mode.png)
    
-   When **disabled**:  
    Normal site access is restored for all users.

---

## Bench start Command
* Starts the Bench development environment and all configured processes.
* Run this command from the Bench directory.

**Command Syntax**

```
bench start
```

**Use Case**
```bash
bench start
```

**Accessing a Local Site**

Sites can be accessed in the browser using:

```
<sitename>:8000
```

**Example**

```bash
dev.localhost:8000
```

----------

## Bench get-app Command

-   Downloads an app from a Git repository or Frappe Marketplace and adds it to the Bench.
    

**Command Syntax**

```
bench get-app <app-name> / [repo-link]
```

**Options**

| Options | Description |
| --------- | ------------------- |
| `--branch <branch-name>` | Fetches the app from a specific branch |

**Use Case**

```bash
bench get-app https://github.com/lmnaslimit/custom_app
```

**With Branch**

```bash
bench get-app --branch develop https://github.com/lmnaslimit/custom_app
```

**Getting an App from Frappe Marketplace**
```bash
bench get-app erpnext
```

----------

## Bench new-site Command

-   Creates a new Frappe site.
    

**Command Syntax**

```
bench new-site <site-name>
```

**Use Case**

```bash
bench new-site dev.localhost

```

**For Local Development**

-   Site name should follow the format **.localhost**
    
-   Administrator password: <pwd>
    
-   MySQL root password: <MySQL_pwd>
    

----------

## Bench drop-site Command

-   Removes the site and its database completely.
    

**Command Syntax**

```
bench drop-site <site-name>
```

**Options**

| Options   | Description |
| --------- | ------------------- |
| `--root-login` | Root database login |
| `--root-password` | Root database password |

**Use Case**

```bash
bench drop-site dev.localhost
```

**Sample Output**
```bash
MySQL root password:
Installing frappe...
Updating DocTypes for frappe        : [========================================]
Updating Dashboard for frappe
*** Scheduler is disabled ***
*** Administrator password set ***
Site dev.localhost created
```

> **Note:** Take a backup of the site before dropping it if the data is required later.

----------

## Bench new-app Command

-   Creates a new Frappe application in the Bench.
    

**Command Syntax**

```
bench new-app <app-name>
```

**Use Case**

```bash
bench new-app custom_app
```
**Sample Output**
```bash
App Title [Custom App]: custom_app
App Description: A custom app for overriding
App Publisher: LMNAs
App Email: email@email.com
App License:
```
----------

## Bench uninstall-app Command

-   Uninstalls an app from the specified site and removes everything linked to the app.
    

> **Note:** Bench should be running when executing this command.

**Command Syntax**

```
bench --site <site-name> uninstall-app <app-name>
```

**Use Case**

```bash
bench --site dev.localhost uninstall-app custom_app
```

----------

## Bench remove-app Command

-   Removes an app from the Bench entirely.
    

**Command Syntax**

```
bench remove-app <app-name>
```

**Use Case**

```bash
bench remove-app custom_app
```

> **Note:** If the app is installed on a site, uninstall the app from the site before removing it from the Bench.

----------

## Bench data-import Command

-   Imports bulk data into a DocType.
    
-   Supports `.csv`, `.xls`, and `.xlsx` files.
    

**Command Syntax**

```
bench data-import
```

**Options**

| Options | Description |
| --------- | ------------------- |
| `--file` | File name |
| `--doctype` | DocType to import data into |
| `--type` | Import type: Insert or Update |

Import type: Insert or Update

**Use Case**

```bash
bench data-import --file items.xlsx --doctype Item --type Insert

```

----------

## Bench run-tests Command

-   Runs tests for the specified site.
    

**Command Syntax**

```
bench --site <site-name> run-tests

```

**Options**

| Options | Description |
| --------- | ------------------- |
| `--app` | Run tests for a specific app |
| `--doctype` | Run tests for a specific DocType |
| `--test` | Run a specific test |
| `--module` | Run tests for a specific module |
| `--profile` | Run tests with Python profiling enabled |

**Use Cases**

**1) Run tests for a site**

```bash
bench --site dev.localhost run-tests
```

**2) Run tests for a specific app**

```bash
bench --site dev.localhost run-tests --app custom_app
```

**3) Run tests for a specific DocType**

```bash
bench --site dev.localhost run-tests --doctype Item
```

**4) Run a specific test**

```bash
bench --site dev.localhost run-tests --test test_example
```