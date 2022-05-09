# weatherApi

[![codecov](https://codecov.io/gh/yeukfei02/weatherApi/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/weatherApi)

weatherApi by openweathermap

documentation: <https://documenter.getpostman.com/view/3827865/SzezdXua?version=latest>

## Requirement

- install yarn
- install node (v12+)
- install mongodb

## Testing and run

```zsh
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint
```

## Docker

```zsh
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/weatherApi/blob/master/CONTRIBUTING.md)
