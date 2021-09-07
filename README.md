# foxx-nginx-chai
Short test for Foxx-Builder driven API, OpenResty running in Docker

### Start docker containers
Assuming you have Docker installed already

```shell
docker compose up
```

## Preparing the database

Once docker containers are up and running, login on http://loclhost:9999 and use `root` as username and `openSesame` as password.

- Create new user called `demo` with password `demo`
- Create new database `demo` with user `demo`

Now you can continue with installing Foxx Microservices on your database.

### Install Foxx CLI

```shell
yarn global add foxx-cli
```

Or with npm:

```shell
npm install --global foxx-cli
```

### Install dependencies required to run local tests

```shell
yarn
```


### Register Foxx Microservices dev server

```shell
foxx server set docker-demo http://demo:demo@localhost:9999
```

or

```shell
foxx server set docker-demo http://demo:demo@localhost:9999
```

### Install APIs

The `package.json` already contains some of the scripts to simplify your tasks

```shell
yarn run install-foxx-dev
```

or

```shell
foxx install /api ./api --server docker-demo --database demo
```

### Updating Foxx Microservices APIs

```shell
foxx replace /api ./api --server docker-demo --database demo
```

or

```shell
foxx replace /api ./api --server docker-demo --database demo
```

## Running tests

```shell
yarn test 
```