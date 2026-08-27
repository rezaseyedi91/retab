# ReTab
Vue/Express.js web application for encoding early music tablature


# Experience the ReTab
Try ReTab https://tab.rezaseyedi.com
 with a guest account:
-    username: guest
-    password: retabguest@123

or contact reza.seyedi010@gmail.com if you want to use ReTab with a personal account.



# ReTab Deployment Guide

## Overview

ReTab is deployed using Docker Compose.

Production services:
- MySQL database
- ReTab API server (Node.js + Prisma)
- ReTab frontend (Vue + nginx)

The production stack is defined in:

```
docker-compose.prod.yaml
```

---

## First Deployment
One small recommendation: I would also add this sentence near the top of the deployment section:

The production deployment uses two compose files:
- `docker-compose.prod.yaml` for normal operation
- `docker-compose.bootstrap.yaml` for first-time database initialization


### 1. Clone repository

```bash
git clone https://github.com/rezaseyedi91/retab.git
cd retab
```

---

### 2. Configure environment variables

Create the production environment file:

```bash
nano .env
```

Required variables:

```env
MODE=production

DATABASE_URL=mysql://USER:PASSWORD@mysql:3306/DATABASE

MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=retab
MYSQL_USER=retab
MYSQL_PASSWORD=...

RETAB_SERVER_PORT=4000
RETAB_CLIENT_PORT=8080


SECRET_KEY=...
```



### 3. Database Initialization / Start MySQL


```bash
docker compose -f docker-compose.prod.yaml up -d mysql
```

Wait until MySQL is healthy:

```bash
docker compose -f docker-compose.prod.yaml ps
```

---

### 4. Run Prisma migrations

```bash
docker compose -f docker-compose.prod.yaml run --rm migrate
```

---

### 5. Import initial data
---

The initial database dump is provided separately: `initial-db/retab-initial-data.sql`
This file is not stored in the public repository.
The initial database dump is transferred separately because it contains application data.


```bash
docker compose \
  -f docker-compose.prod.yaml \
  -f docker-compose.bootstrap.yaml \
  up init-data
```

Successful output:

```
Initial data imported successfully.
```

---

## Build and Start ReTab

Build production images:

```bash
docker compose -f docker-compose.prod.yaml build
```

Start services:

```bash
docker compose -f docker-compose.prod.yaml up -d
```

Check status:

```bash
docker compose -f docker-compose.prod.yaml ps
```

Expected:

```
mysql     running
server    running
client    running
```

---

## Updating ReTab

After a new version is pushed:

```bash
git pull
```

Rebuild:

```bash
docker compose -f docker-compose.prod.yaml build
```

Restart:

```bash
docker compose -f docker-compose.prod.yaml up -d
```

---

## Logs

Server logs:

```bash
docker compose -f docker-compose.prod.yaml logs -f server
```

Client logs:

```bash
docker compose -f docker-compose.prod.yaml logs -f client
```

Database logs:

```bash
docker compose -f docker-compose.prod.yaml logs -f mysql
```

---

## Backup Database

Create a backup:

```bash
docker compose exec mysql \
mysqldump -u root -p retab > retab-backup.sql
```

---

## Stopping ReTab

Stop services:

```bash
docker compose -f docker-compose.prod.yaml down
```

The database volume is preserved.

To remove everything including database data:

```bash
docker compose -f docker-compose.prod.yaml down -v
```

Warning: this deletes the database.












# Development
clone the repository:
## client:
create .env file:

    VUE_APP_API_URL="http://localhost:4000"
    VUE_APP_API_URL_PRODUCTION="https://tab.rezaseyedi.com/api/"
    VUE_APP_ENV="development"
    cd ./retab-client
    npm install 
    npm run serve



## server:
    cd ./retab-server


create .env file with these environment variables: : 

    PORT=4000
    MODE="development"
    TAB_CLIENT_URL="http://localhost:8080"

    DATABASE_URL="mysql://username:password@localhost:3306/dbname"

then run: 

    npm install
let prisma make a local mysql database;

    npx prisma migrate deploy

run development server:

    npx nodemon index.ts


