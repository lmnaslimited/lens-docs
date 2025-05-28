---
title: Docker Swarm
---
> **Note:** Use `sudo` if your user is not in the `docker` group.
## Docker ps Command
* List all the running containers in the VM/VPC

**Command Syntax**
```
docker ps
```
**Sample Output**
```
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES
a1b2c3d4e5f6   ubuntu         "/bin/bash"              3 minutes ago     Up 3 minutes                              mycontainer
b7c8d9e0f1g2   nginx:latest   "/docker-entrypoint.…"   2 minutes ago     Up 2 minutes     0.0.0.0:80->80/tcp       webserver

```
---
## Docker exec Command
* The command `docker exec` is used to access a running Docker container's shell or run the command inside the container from the VM/VPC.

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**
```
docker exec <options> <container_name_or_id> <command>
```
**Options**

| Options    | Description|
| --------- |------------------- |
| `-d, --detach`  | Detached mode: run command in the background |
| `-i, --interactive`  | Keep STDIN open for interaction |
| `-t, --tty`  |   Allocate a pseudo-TTY (Pseudo Terminal)|
| `-w, --workdir`  | Working directory inside the container |

**Common Patterns or Use Cases**

**1) With container name**
```
docker exec -it mycontainer bash
```
**Sample Output**
```
// Opens a Shell for interactive mode
root@ca1b2c3d4e5f6:/#
```
**2) With container id**
```
docker exec -it a1b2c3d4e5f6 bash
```
**Sample Output**
```
root@a1b2c3d4e5f6:/#
```
**3) With detach flag**
```
docker exec -d mycontainer mkdir test
```
**Sample Output**
```
// The detached mode causes the command to run in the background only show the commad id in the terminal
c3f279d17e0a1d2be0f85eaf41f905f6bda76b223f214d4b73f6e8ed4a7e1d23 // container command id
```
**4) Without flag**
```
docker exec mycontainer ls
```
**Sample Output**
```
// list the folder from the working directory
bin   boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  
root  run   sbin srv  sys   test  tmp  usr  var
```
**5) With workdir flag**
```
docker exec -it -w /root mycontainer pwd
```
**Sample Output**
```
/root
```
---
## Docker restart command
* Restart the Container with same configuration.

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**
```
docker restart a1b2c3d4e5f6
```
**Sample Output**
```
a1b2c3d4e5f6
```
---
## Docker build Command
* Build a docker image from the Dockerfile.

**Prerequisite**

* Need a Dockerfile

**Command Syntax**
```
docker build -t <image_name> -f <PATH/TO/Dockerfile> .
```
**Options**

| Options    | Description|
| --------- |------------------- |
| `-t, --tag`  | name of the image |
| `-f, --file`  | Dockerfile Path |
| `--build-arg`  |   Set build-time arguments|
| `--no-cache`  | Do not use cache when building the image |

**Common Patterns or Use Cases**

**1) Dockerfile in the working directory**
```
docker build -t myimage:latest .
```
**Sample Output**
```
[+] Building 12.3s (5/7) FINISHED                                                                                                             
 => [internal] load build definition from Dockerfile                                                                                      0.0s
 => => transferring dockerfile: 123B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                         0.0s
 => => transferring context: 2B                                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                          1.2s
 => [1/3] FROM docker.io/library/alpine:latest                                                                                            1.0s
 => [2/3] RUN apk add --no-cache curl                                                                                                    9.5s
 => [3/3] CMD ["sh"]                                                                                                                      0.2s
```
**2) Dockerfile not in the working directory**
```
docker build -t myimage:latest -f ./docker/Dockerfile .
```
**Sample Output**
```
[+] Building 2.3s (7/7) FINISHED                                                                                                              
 => [internal] load build definition from Dockerfile                                                                                      0.0s
 => => transferring dockerfile: 123B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                         0.0s
 => => transferring context: 2B                                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                          0.5s
 => [1/4] FROM docker.io/library/alpine:latest                                                                                            0.4s
 => [2/4] RUN apk add --no-cache curl                                                                                                    0.0s
 => CACHED [3/4] COPY . /app                                                                                                              0.0s
 => CACHED [4/4] CMD ["sh"]                                                                                                               0.0s

```
**3) With no cache flag**
```
docker build --no-cache -t myimage:latest .
```
**Sample Output**
```
[+] Building 12.5s (7/7) FINISHED                                                                                                             
 => [internal] load build definition from Dockerfile                                                                                      0.0s
 => => transferring dockerfile: 123B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                         0.0s
 => => transferring context: 2B                                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                          1.2s
 => [1/4] FROM docker.io/library/alpine:latest                                                                                            1.1s
 => [2/4] RUN apk add --no-cache curl                                                                                                    9.8s
 => [3/4] COPY . /app                                                                                                                      0.3s
 => [4/4] CMD ["sh"]                                                                                                                      0.1s
```
**4) Passing arguments during build**
```
docker build --build-arg VERSION=3.18 -t myimage:latest .
```
**Sample Output**
```
[+] Building 7.8s (6/6) FINISHED                                                                                                              
 => [internal] load build definition from Dockerfile                                                                                      0.0s
 => => transferring dockerfile: 123B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                         0.0s
 => => transferring context: 2B                                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:3.18                                                                           1.2s
 => [1/4] FROM docker.io/library/alpine:3.18                                                                                             1.0s
 => [2/4] RUN apk add --no-cache curl                                                                                                    6.2s
 => [3/4] CMD ["sh"]                                                                                                                      0.2s
```
---
## Docker cp Command

* Copy the content from source path to target path
* Can Copy from VM file system to Container and Vice-versa.

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**

**1) From VM to container**
```
docker cp ./some_file <container_id>:/path/to/dump
```
**Example**
```
docker cp ./test.txt a1b2c3d4e5f6:/mnt
```
**1) From container to VM**
```
docker cp <container_id>:/path/to/some_file ./path/to/dump
```
**Example**
```
docker cp a1b2c3d4e5f6:/etc/hostname ./dump/
```
---
## Docker logs Command

* Show the logs of a container

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**
```
docker logs <container_id>
```
**Example**
```
docker logs a1b2c3d4e5f6
```
**Sample Output**
```
[INFO] Starting web server on port 8080...
[INFO] Server listening at http://0.0.0.0:8080
[WARN] Cache not found, starting with empty cache.
```
---
## Docker stats Command

* This command give the real-time metrics for the container's CPU and memory usage.

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**
```
docker stats <container_name_or_id>
```
**Example**
```
docker stats a1b2c3d4e5f6
```
**Sample Output**
```
CONTAINER ID   NAME         CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
a1b2c3d4e5f6   mycontainer  0.45%     12.34MiB / 512MiB      2.41%     1.2kB / 1.5kB      0B / 0B           1
```
---
## Docker prune Command

* Remove all unused containers, networks, images.
* By default volumes are not remove because to prevent data loss

**Command Syntax**
```
docker system prune <option>
```
**Options**

| Options    | Description|
| --------- |------------------- |
| `-a, --all`  | Remove unused and dangling images |
| `--volumes`  | Remove unused volumes |

**Use Cases**

**1) Default**
```
docker system prune
```
**Sample Output**
```
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all build cache

Are you sure you want to continue? [y/N] y

Deleted Containers:
a1b2c3d4e5f6
b7c8d9e0f1g2

Deleted Networks:
mycontainer_network

Deleted Images:
untagged: myimage:latest
deleted: sha256:123abc456def...

Deleted build cache:
Total reclaimed space: 305.6MB
```
**2) Use volume flag to remove unused volume**
```
docker system prune --volumes
```
**Sample Output**
```
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all build cache
  - all unused volumes

Are you sure you want to continue? [y/N] y

Deleted Containers:
c3d4e5f6g7h8
d9e0f1g2h3i4

Deleted Networks:
myapp_default

Deleted Volumes:
myapp_volume
mycontainer_volume

Deleted Images:
untagged: myapp:old
deleted: sha256:abc123...

Deleted build cache:
Total reclaimed space: 457.2MB
```
**3) With all flag**
```
docker system prune -a
```
**Sample Output**
```
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] y

Deleted Containers:
e3f1a2c4b6d8
f5d9a0c1b2e3

Deleted Networks:
myapp_network

Deleted Images:
untagged: node:alpine
deleted: sha256:abc123...
untagged: myapp:old
deleted: sha256:def456...

Deleted build cache:
Total reclaimed space: 692.4MB
```
---
## Docker inspect Command

* Display detailed information the containers in JSON format

**Prerequisite**
[Need `docker ps` command to get the container ID](#docker-ps-command)

**Command Syntax**

```
docker container inspect <container_id>
```

**Options**

| Options    | Description|
| --------- |------------------- |
| `-f, --format`  | Filter or format output using Go templating |

**Use Cases**
**1) Without flag**
```
docker container inspect a1b2c3d4e5f6
```
**Sample Output**
```
[
  {
    "Id": "a1b2c3d4e5f6g7h8i9j0",
    "Created": "2025-05-27T12:34:56.789Z",
    "Path": "/bin/bash",
    "Args": [],
    "State": {
      "Status": "running",
      "Running": true,
      "StartedAt": "2025-05-27T12:35:01.000Z"
    },
    "Image": "sha256:123abc...",
    "Name": "/mycontainer",
    "HostConfig": {
      "NetworkMode": "default"
    },
    "Mounts": [
      {
        "Type": "volume",
        "Name": "my-volume",
        "Destination": "/data"
      }
    ],
    "Config": {
      "Hostname": "a1b2c3d4e5f6",
      "Image": "ubuntu",
      "Cmd": [
        "/bin/bash"
      ]
    },
    "NetworkSettings": {
      "IPAddress": "172.17.0.2"
    }
  }
]
```
**2) With flag**
```
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' a1b2c3d4e5f6
```
**Sample Output**
```
172.17.0.2
```
---
## Command for start/stop/restart/status for Docker Daemon in Ubuntu
* status -> Shows Docker's status
* start -> Starts Docker Engine
* stop -> Halts Docker Engine and all containers
* restart -> Restarts the Docker daemon cleanly.

**Command Syntax**
**1) To check the status of the docker engine**
```
systemctl status docker
```
**Sample Output**
```
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2025-05-28 09:32:44 UTC; 2min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 1135 (dockerd)
      Tasks: 19
     Memory: 48.3M
        CPU: 2.134s
     CGroup: /system.slice/docker.service
             └─1135 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```
**2) To start the docker engine**
```
systemctl start docker
```
**3) To stop the docker engine**
```
systemctl stop docker
```
**4) To restart the docker engine**
```
systemctl restart docker
```
---