# Performance Monitor with Socket.io 

Local machines performance monitoring using Socket.io, Redis, Node.js. Monitor multiple machines, CPU usage and load, RAM usage, total and free memory stats, and general machine information.

## `Stack: Node.js, Express, Socket.io, Redis`
![image](https://github.com/Jubiko31/performance-monitor-socketio/assets/53910160/eeacde3e-754b-40ff-8ac9-cb2d48401ea8) &nbsp;&nbsp;
![image](https://github.com/Jubiko31/performance-monitor-socketio/assets/53910160/ecc1ec1d-a979-4a13-bf6a-cbd1937f1525) &nbsp;&nbsp;
![image](https://github.com/Jubiko31/performance-monitor-socketio/assets/53910160/3fe5133f-fbd9-426f-b8f5-0801b198868c) &nbsp;&nbsp;
![image](https://github.com/Jubiko31/performance-monitor-socketio/assets/53910160/a59c8eb7-8c73-4a44-a214-67d26fc7cf0f) &nbsp;


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

