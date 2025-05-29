---

title: Kubernetes

---

  
  

## K3s Cluster Forming (Server & Agent Nodes)

  

K3s makes it easy to form a lightweight Kubernetes cluster by running a **server node** (control plane) and connecting **agent nodes** (workers) to it.

  

---

  

### Prerequisite:

  

* All nodes must have network connectivity to each other.

* Install script: `https://get.k3s.io`

* Required ports (6443, 8472/UDP, etc.) must be open.

  

---

  

### Command Syntax for Server (Control Plane):

  

```bash

curl  -sfL  https://get.k3s.io | sh  -s  -  server  \

--node-name <server-name> \

--cluster-init

```

  

---

  

### Parameters & Options (Server):

  
| Parameter        | Type | Description                                |
|------------------|------|--------------------------------------------|
| `--node-name`    | flag | Custom name for the server node            |
| `--cluster-init` | flag | Initializes a new K3s cluster (1st node)   |


  

---

  

### Common Use Case:

  

```bash

curl  -sfL  https://get.k3s.io | sh  -s  -  server  --node-name  master-1  --cluster-init

```

  

---

  

### Sample Output:

  

```

[INFO] Starting k3s server...

[INFO] k3s is up and running on https://<server-ip>:6443

```

  

---

  

### Command Syntax for Agent (Worker Node):

  

```bash

curl  -sfL  https://get.k3s.io | K3S_URL=https://<server-ip>:6443  \

K3S_TOKEN=<token> \

sh  -s  -  agent  \

--node-name <agent-name>

```

  

---

  

### Parameters & Options (Agent):

  
| Parameter      | Type | Description                          |
|----------------|------|--------------------------------------|
| `K3S_URL`      | env  | API server URL (control plane)       |
| `K3S_TOKEN`    | env  | Cluster join token from server       |
| `--node-name`  | flag | Name of the agent node               |

  

---

  

### Get the Token (on Server):

  

```bash

sudo  cat  /var/lib/rancher/k3s/server/node-token

```

  

---

  

### Example (Agent):

  

```bash

curl  -sfL  https://get.k3s.io | K3S_URL=https://192.168.1.10:6443  \

K3S_TOKEN=K1057c7... \

sh  -s  -  agent  --node-name  worker-1

```

  

---

  

### Sample Output (Agent):

  

```

[INFO] Starting k3s agent...

[INFO] Connecting to https://192.168.1.10:6443

[INFO] k3s agent is up and running

```

  

---

  
  
  
  
  

## Managing K3s Service with systemctl

  

Use these commands to check the status, restart, stop, or start the K3s service on your node.

Helpful for troubleshooting, service maintenance, or applying configuration changes.

  

---

  

### Prerequisite:

  

> You need sudo privileges on the node where K3s is installed.

  
  
  

### Command Syntax & Usage:

  


| Command                      | Description                             |
|-----------------------------|-----------------------------------------|
| `sudo systemctl status k3s` | Check the current status of K3s service |
| `sudo systemctl restart k3s`| Restart the K3s service                  |
| `sudo systemctl stop k3s`   | Stop the K3s service                     |
| `sudo systemctl start k3s`  | Start the K3s service                    |

  

---

  

### Common Patterns or Use Cases:

  

*  **Check if K3s is running:**

  

```bash

sudo  systemctl  status  k3s

```

  

*  **Restart K3s to apply config changes or recover from issues:**

  

```bash

sudo  systemctl  restart  k3s

```

  

*  **Stop K3s service when maintenance is needed:**

  

```bash

sudo  systemctl  stop  k3s

```

  

*  **Start K3s after it has been stopped:**

  

```bash

sudo  systemctl  start  k3s

```

  
  
  

### Sample Output for status:

  

```

● k3s.service - Lightweight Kubernetes

Loaded: loaded (/etc/systemd/system/k3s.service; enabled; vendor preset: enabled)

Active: active (running) since Tue 2025-05-28 09:10:01 UTC; 2h 15min ago

Main PID: 1234 (k3s-server)

Tasks: 34 (limit: 4915)

Memory: 250.0M

CPU: 3min 22.567s

```

  

---

  
  

## Applying Kubernetes Configuration in K3s

  

Applies or updates resources defined in a YAML/JSON manifest file.

Used to create, update, or delete Kubernetes resources declaratively.

  
  
  

### Prerequisite:

  

> Have the manifest file (`file.yaml`) ready locally or accessible by your terminal.

> Ensure correct namespace is specified if resource is namespace-scoped.

  
  
  

### Command Syntax:

  

```bash

kubectl  apply  -f <file.yaml> -n <namespace>

```

  
  
  

### Parameters & Options:

  


| Parameter        | Type | Description                                 |
|------------------|------|---------------------------------------------|
| `-f <file.yaml>` | flag | Path to the YAML or JSON manifest file      |
| `-n`             | flag | Namespace to apply the resource to          |

  
  
  

### Common Patterns or Use Cases:

  

**Apply a deployment manifest to a namespace:**

  

```bash

kubectl  apply  -f  deployment.yaml  -n  app

```

  
  

### Sample Output:

  

```

deployment.apps/myapp created

service/myservice configured

configmap/myconfig unchanged

```

  



---

##  Getting Namespaces in K3s

List all namespaces in the cluster.
Namespaces help organize and isolate resources.



### Command Syntax:

```bash
kubectl get ns
```

---

### Parameters & Options:

| Parameter | Type | Description                |
| --------- | ---- | -------------------------- |
| `ns`      | arg  | Short form for `namespace` |

---

### Common Use Case:

* **List all namespaces:**

```bash
kubectl get ns
```

---

### Sample Output:

```
NAME              STATUS   AGE
default           Active   10d
kube-system       Active   10d
kube-public       Active   10d
kube-node-lease   Active   10d
```

---


  
  
  

## Getting Kubernetes Resources in K3s

  

Displays a list of commonly used Kubernetes resources such as Pods, Nodes, Services, and Endpoints. Helps monitor resource status, troubleshoot issues, and verify deployments.

  
  
  

### Prerequisite:

  

None — just ensure your cluster is running and `kubectl` is configured (e.g., `k3s kubectl` or alias).


  
  
  

### Command Syntax:

  

```bash

kubectl  get <resource> -n <namespace> [flags]

```

  
  
  

### Parameters & Options:

  


| Parameter                  | Type | Description                                       |
|----------------------------|------|---------------------------------------------------|
| `<resource>`               | arg  | Resource type like `pods`, `svc`, `nodes`         |
| `-n`                       | flag | Specifies the namespace (where applicable)        |
| `-o wide`                  | flag | Shows more details like IP, node, etc.            |
| `-A` or `--all-namespaces` | flag | Lists resources across all namespaces             |


  
  
  

### Common Patterns or Use Cases:

  

#### Get all pods in a specific namespace

  

```bash

kubectl  get  pods  -n  default

```

  

#### Get all nodes in the cluster

  

```bash

kubectl  get  nodes

```

  

#### Get all services in a namespace

  

```bash

kubectl  get  svc  -n  kube-system

```

  

#### Get endpoints in a namespace

  

```bash

kubectl  get  endpoints  -n  app

```

  

#### Get pods with extended info (e.g., IPs, node names)

  

```bash

kubectl  get  pods  -o  wide  -n  erpnext

```

  

#### Get all services across all namespaces

  

```bash

kubectl  get  svc  -A

```

  
  
  

### Sample Output:

  

#### Pods

  

```bash

NAME  READY  STATUS  IP  NODE  AGE

nginx-deployment-65fdb85b49-7jdt4  1/1  Running  10.42.0.5  k3s-node1  5m

```

  

#### Nodes

  

```bash

NAME  STATUS  ROLES  AGE  VERSION

k3s-master  Ready  control-plane,master  20h  v1.27.3+k3s1

```

  

#### Services

  

```bash

NAME  TYPE  CLUSTER-IP  EXTERNAL-IP  PORT(S) AGE

kubernetes  ClusterIP  10.43.0.1 <none> 443/TCP  20h

```

  

#### Endpoints

  

```bash

NAME  ENDPOINTS  AGE

nginx  10.42.1.23:80  4m

```

  
  
  

----------

  

## Describing a Pod in K3s

  

Displays detailed information about a specific pod, including container specs, events, volume mounts, and state transitions.

Useful for debugging issues like scheduling problems, container crashes, and init delays.

  
  
  

### Prerequisite:

  

> You need the [pod name](#get-all-pods-in-a-specific-namespace) and [namespace](#getting-namespaces-in-k3s)


>



  
  

### Command Syntax:

  

```bash

kubectl  describe  pod <pod-name> -n <namespace>

```

  
  

### Parameters & Options:

  


| Parameter     | Type | Description                        |
|---------------|------|------------------------------------|
| `<pod-name>`  | arg  | Name of the pod to describe        |
| `-n`          | flag | Specifies the namespace of the pod |


  
  
  

### Common Patterns or Use Cases:

  

#### Describe a pod to troubleshoot issues like CrashLoopBackOff:

  

```bash

kubectl  describe  pod  nginx-5d5f74c8f9-abcde  -n  web

```

  
  
  

### Sample Output:

  

```

Name: nginx-5d5f74c8f9-abcde

Namespace: web

Priority: 0

Node: k3s-node/192.168.1.100

Start Time: Tue, 28 May 2025 10:21:01 +0000

Labels: app=nginx

Status: Running

IP: 10.42.0.12

Containers:

nginx:

Image: nginx:latest

Port: 80/TCP

State: Running

Ready: True

Events:

Type Reason Age From Message

---- ------ ---- ---- -------

Normal Scheduled 2m default-scheduler Successfully assigned web/nginx-xxx to k3s-node

  

```

  
  
  

---

  

## Getting Pod Logs in K3s

  

Displays the logs of a specific pod’s container.

Helps identify errors, monitor application output, and debug running containers.

  
  

### Prerequisite:

  

> 

You need the [pod name](#get-all-pods-in-a-specific-namespace) and [namespace](#getting-namespaces-in-k3s)
  

### Command Syntax:

  

```bash

kubectl  logs <pod-name> -n <namespace> [flags]

```

  
  
  

### Parameters & Options:

  


| Parameter        | Type | Description                                        |
|------------------|------|----------------------------------------------------|
| `<pod-name>`     | arg  | Name of the pod                                    |
| `-n`             | flag | Specifies the namespace                            |
| `-c <container>` | flag | Specify container name if multiple exist           |
| `-f`             | flag | Follow the logs output (stream logs)              |


  
  

### Common Patterns or Use Cases:

  

*  **Get logs of a pod:**

  

```bash

kubectl  logs  myapp-pod-12345  -n  mynamespace

```

  

*  **Follow logs live:**

  

```bash

kubectl  logs  -f  myapp-pod-12345  -n  mynamespace

```

  

*  **Get logs from a specific container in a pod:**

  

```bash

kubectl  logs  myapp-pod-12345  -c  sidecar-container  -n  mynamespace

```

  
  

### Sample Output:

  

```

2025-05-28T12:00:01.123Z INFO Starting server on port 8080

2025-05-28T12:00:05.456Z INFO Connection established with database

2025-05-28T12:05:12.789Z ERROR Failed to fetch user data

```

  

---

  
  

## Executing Commands Inside a Pod in K3s

  

Allows you to run commands interactively or non-interactively inside a container of a pod.

Useful for troubleshooting, debugging, or running administrative commands inside the pod.

  
  
  

### Prerequisite:

  

> You need the [pod name](#get-all-pods-in-a-specific-namespace) and [namespace](#getting-namespaces-in-k3s)

> Get pod name with:

  

```bash

 kubectl  get  pods  -n <namespace>

```

  
  
  

### Command Syntax:

  

```bash

kubectl  exec  -it <pod-name> -n <namespace> -- <command>

```

  
  
  

### Parameters & Options:

  


| Parameter    | Type | Description                                   |
|--------------|------|-----------------------------------------------|
| `<pod-name>` | arg  | Name of the pod                               |
| `-n`         | flag | Namespace where the pod resides                |
| `-i`         | flag | Pass stdin to the container (interactive mode)|
| `-t`         | flag | Allocate a pseudo-TTY (for terminal)           |
| `<command>`  | arg  | The command to run inside the pod’s container |


  
  
  

### Common Patterns or Use Cases:

  

*  **Run a single command (e.g., list files):**

  

```bash

k3s  kubectl  exec  -it  mypod  -n  default  --  ls  /app

```

  

*  **Run interactive bash shell:**

  

```bash

k3s  kubectl  exec  -it  mypod  -n  default  --  /bin/bash

```

  
  
  

### Sample Output:

  

```

# /bin/sh inside nginx-pod

$ ls -l /usr/share/nginx/html

total 4

-rw-r--r-- 1 root root 612 May 28 12:00 index.html

```

  
  
  

---

  

## Port Forwarding to a Pod in K3s

  

Allows you to forward one or more local ports to a port on a pod.

  

Useful for debugging or accessing a pod’s service locally without exposing it via a service or ingress.

  
  
  

### Prerequisite:

  

>  You need the [pod name](#get-all-pods-in-a-specific-namespace) , [namespace](#getting-namespaces-in-k3s) and the ports you want to forward.

>



  
  
  

### Command Syntax:

  

```bash

kubectl  port-forward  pod/<pod-name> <local-port>:<pod-port> -n <namespace>

```

  
  

### Parameters & Options:

  


| Parameter       | Type | Description                   |
|-----------------|------|-------------------------------|
| `pod/<pod-name>` | arg  | Name of the pod               |
| `<local-port>`   | arg  | Local machine port to listen on |
| `<pod-port>`    | arg  | Port on the pod to forward traffic to |
| `-n`            | flag | Namespace                    |

  
  
  

### Common Patterns or Use Cases:

  

**Forward local port 8080 to pod port 80:**

  

```bash

kubectl  port-forward  pod/myapp-pod  8080:80  -n  default

```

  
  
  
  
  

### Sample Output:

  

```

Forwarding from 127.0.0.1:8080 -> 80

Handling connection for 8080

```

  
  
  
  
  

---

  

## Viewing Pod Performance Metrics in K3s

  

Displays CPU and memory usage of pods to monitor resource consumption and troubleshoot performance issues.

  
  
  

### Prerequisite:

  

> Metrics Server must be installed and running in the cluster.

> You can verify with:

  

```bash

kubectl  get  deployment  metrics-server  -n  kube-system

```

  
  

### Command Syntax:

  

```bash

kubectl  top  pods  -n <namespace> [flags]

```

  
  
  

### Parameters & Options:

  


| Parameter     | Type | Description                        |
|---------------|------|----------------------------------|
| `-n`          | flag | Namespace to list pod metrics from |
| `--containers`| flag | Show metrics per container (optional) |

  
  
  

### Common Patterns or Use Cases:

  

*  **Show CPU and memory usage of all pods in a namespace:**

  

```bash

kubectl  top  pods  -n  default

```

  

*  **Show metrics per container inside pods:**

  

```bash

kubectl  top  pods  -n  default  --containers

```

  
  
  

### Sample Output:

  

```

NAME CPU(cores) MEMORY(bytes)

nginx-5d5f74c8f9-abcde 10m 20Mi

redis-master-765d459796-xyz 5m 15Mi

```

  
  

---

  

## Getting Pod Details in YAML Format in K3s

  

Outputs the full detailed configuration and status of a pod in YAML format.

Useful for deep inspection, debugging, or exporting pod specs.

  



  

### Prerequisite:

  

> You need the [pod name](#get-all-pods-in-a-specific-namespace) and [namespace](#getting-namespaces-in-k3s)

>

>

  
  
  

### Command Syntax:

  

```bash

kubectl  get  pod <pod-name> -n <namespace> -o  yaml

```

  
  
  

### Parameters & Options:

  


| Parameter  | Type | Description           |
|------------|------|-----------------------|
| `<pod-name>` | arg  | Name of the pod        |
| `-n`       | flag | Namespace of the pod   |
| `-o yaml`  | flag | Output format in YAML  |


  



  

### Common Patterns or Use Cases:

  

*  **Get detailed YAML description of a pod:**

  

```bash

kubectl  get  pod  myapp-pod  -n  default  -o  yaml

```

  
  
  

### Sample Output:

  

```yaml

apiVersion: v1

kind: Pod

metadata:

name: myapp-pod

namespace: default

labels:

app: myapp

spec:

containers:

- name: myapp-container

image: myapp:latest

ports:

- containerPort: 8080

status:

phase: Running

podIP: 10.42.1.15

```

  
  

## Deleting Pods in K3s

  

Deletes one or more pods by name or label selector.

Useful for removing faulty or unneeded pods manually.

  



  

### Prerequisite:

  

> You need the [pod name](#get-all-pods-in-a-specific-namespace) and [namespace](#getting-namespaces-in-k3s)

>



  

---

  

### Command Syntax:

  

```bash

kubectl  delete  pod <pod-name> -n <namespace>

```

  

Or delete multiple pods by label selector:

  

```bash

kubectl  delete  pod  -l <label-selector> -n <namespace>

```

  
  
  

### Parameters & Options:

  
| Parameter      | Type | Description                  |
|----------------|------|------------------------------|
| `<pod-name>`   | arg  | Name of the pod to delete    |
| `-n`           | flag | Namespace of the pod         |
| `-l <selector>`| flag | Label selector to delete matching pods |

  
  
  

### Common Patterns or Use Cases:

  

*  **Delete a single pod:**

  

```bash

kubectl  delete  pod  myapp-pod  -n  default

```

  

*  **Delete all pods with label `app=nginx`:**

  

```bash

kubectl  delete  pod  -l  app=nginx  -n  default

```

  
  
  
  
  

### Sample Output:

  

```

pod "myapp-pod" deleted

```

  

---

  


## Pruning Resources in Kubernetes (Kubectl)

  

Kubernetes can achieve pruning (cleaning up unused resources) with:

  

*  `kubectl apply --prune` — deletes resources not defined in your current manifests.

* Manual deletion using label selectors.

  
  
  
  

### Command Syntax:

  

```bash

kubectl  apply  -f <directory-or-file> --prune  -l <label-selector> -n <namespace>

```

  
  
  

### Parameters & Options:

  

| Parameter      | Type | Description                                           |
|----------------|------|-------------------------------------------------------|
| `-f`           | flag | Directory or file path containing manifests           |
| `--prune`      | flag | Enables pruning of resources not in the manifest      |
| `-l <label>`   | flag | Label selector to identify resources to prune         |
| `-n`           | flag | Namespace to apply the pruning                        |

  
  

### Common Patterns or Use Cases:

  

*  **Apply manifests and prune resources without the label `app=myapp` in namespace default:**

  

```bash

kubectl  apply  -f  ./manifests  --prune  -l  app=myapp  -n  default

```

  
  

### Sample Output:

  

```

deployment.apps/myapp configured

service/myapp-service configured

pod/myapp-pod deleted

configmap/old-config deleted

```

  
  
  
  
  
  
  
  

---

  

## Scaling Deployments in K3s

  

Use `kubectl scale` to manually increase or decrease the number of pod replicas in a deployment or other scalable resource.

  



  

### Command Syntax:

  

```bash

kubectl  scale  deployment <deployment-name> --replicas=<count>  -n <namespace>

```

  

---

  

### Parameters & Options:

  
| Parameter          | Type | Description                         |
|--------------------|------|-------------------------------------|
| `<deployment-name>` | arg  | Name of the deployment              |
| `--replicas`       | flag | Number of desired replicas          |
| `-n`               | flag | Namespace where the deployment is located |



  

### Common Patterns or Use Cases:

  

*  **Scale a deployment to 5 replicas:**

  

```bash

kubectl  scale  deployment  myapp-deployment  --replicas=5  -n  default

```

  

*  **Scale down to a single replica:**

  

```bash

kubectl  scale  deployment  myapp-deployment  --replicas=1  -n  default

```

  


  

### Sample Output:

  

```

deployment.apps/myapp-deployment scaled

```

 ---

##  Cordoning & Uncordoning Nodes in K3s

Used to **safely manage node scheduling** during maintenance.
Cordoning prevents new pods from being scheduled on the node, while uncordoning re-enables scheduling.



###  Cordon a Node

> Prevents new pods from being scheduled on a specific node.
> Does not affect running pods.


### Command Syntax:

```bash
kubectl cordon <node-name>
```



### Parameters & Options:

| Parameter     | Type | Description                |
| ------------- | ---- | -------------------------- |
| `<node-name>` | arg  | Name of the node to cordon |



### Common Use Case:

```bash
kubectl cordon worker-node-1
```



### Sample Output:

```
node/worker-node-1 cordoned
```

---

###  Uncordon a Node

> Re-enables scheduling of new pods on the node.


### Command Syntax:

```bash
kubectl uncordon <node-name>
```


### Parameters & Options:

| Parameter     | Type | Description                  |
| ------------- | ---- | ---------------------------- |
| `<node-name>` | arg  | Name of the node to uncordon |



### Common Use Case:

```bash
kubectl uncordon worker-node-1
```


### Sample Output:

```
node/worker-node-1 uncordoned
```

---

