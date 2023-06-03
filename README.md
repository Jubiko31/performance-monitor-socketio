# Performance Monitor with Socket.io 

Local machines performance monitoring using Socket.io, Redis, Node.js. Monitor multiple machines, CPU usage and load, RAM usage, total and free memory stats, and general machine information.

## `Stack: Node.js, Express, Socket.io, Redis`

#### `Additional libraries: Socketio-redis, Farmhash


## Run Application

### Build & Run with Docker:

```sh
$ docker compose up --build -d --remove-orphans
```

### Run Manually

```sh
$ npm run socket:io      # socker server
$ npm run node:client    # node client (machine)
$ npm start              # react client to monitor
```

