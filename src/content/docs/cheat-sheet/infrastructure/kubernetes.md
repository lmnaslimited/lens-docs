
## Getting the pod's log in K3s
* Displaying the logs of the pod
* Helps to Identify the errors of the particular pod

**Prerequisite :**
```
// Get the Pod Name
kubectl get pods -n <namespace>
```
**Command Syntax**

```
 kubectl logs <pod-name> -n <namespace>
```

**Parameters & Options**
| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `-n`  |  flag  |  Namespace       |

**Common Patterns or Use Cases**
* Getting the logs for the pod deployed inside the namespace
```
kubectl logs frappe-bench-erpnext-new-site-20241022020025-6w2pp -n erpnext
```
**Sample Output :**
```
Defaulted container "create-site" out of: create-site, validate-config (init)
++ bench new-site localhost --no-mariadb-socket --db-type=mariadb --db-host=frappe-bench-mariadb --db-port=3306 --admin-password=changeit --mariadb-root-username=root --mariadb-root-password=changeit --install-app=erpnext --force
++ tee /dev/stderr

Installing frappe...
Updating DocTypes for frappe        : [========================================] 100%
Updating Dashboard for frappe

Installing erpnext...
Updating DocTypes for erpnext       : [========================================] 100%
Updating customizations for Address
Updating customizations for Contact
Updating Dashboard for erpnext
*** Scheduler is disabled ***
+ bench_output='
Installing frappe...
Updating DocTypes for frappe        : [========================================] 100%
Updating Dashboard for frappe

Installing erpnext...
Updating DocTypes for erpnext       : [========================================] 100%
Updating customizations for Address
Updating customizations for Contact
Updating Dashboard for erpnext
*** Scheduler is disabled ***'
+ bench_exit_status=0
+ '[' 0 -ne 0 ']'
+ set -e
+ rm -f currentsite.txt
```
