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
```
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
```
bench --site lenstest.lmnas.com backup
```
**Sample Output**
```
Backup encryption is turned on. Please note the backup encryption key.
Backup Summary for lenstest.lmnas.com at 2025-05-29 11:18:07.105285
Config  : ./lenstest.lmnas.com/private/backups/20250529_111752-lenstest_lmnas_com-site_config_backup-enc.json 282.0B
Database: ./lenstest.lmnas.com/private/backups/20250529_111752-lenstest_lmnas_com-database-enc.sql.gz         40.0MiB
Backup for Site lenstest.lmnas.com has been successfully completed
```

**2) With Flag**
```
bench --site lenstest.lmnas.com backup --with-files
```
**Sample Output**
```
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
```
bench --site lenstest.lmnas.com restore ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz

```
**Sample Output**
```
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
```
bench --site lenstest.lmnas.com --force restore \
  ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database.sql.gz \
  --with-public-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-files.tar \
  --with-private-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-private-files.taz
```
**Sample Output**
```
MySQL root password:  

App frappe already installed  
*** Scheduler is enabled ***  
Site localhost has been restored with files
```
**3) With encrypted backup**
```
bench --site lenstest.lmnas.com --force restore \
  ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-database-enc.sql.gz \
  --with-public-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-files-enc.tar \
  --with-private-files ./sites/lenstest.lmnas.com/private/backups/20250529_020517-lenstest_lmnas_com-private-files-enc.tar \
  --encrypted-key hgsdajhvfjwtef7363jkhajkfgj
```
**Sample Output**
```
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
```
bench --site lenstest.lmnas.com migrate
```
**Sample Output**
```
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