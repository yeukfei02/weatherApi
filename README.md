# weatherApi

[![Build Status](https://travis-ci.com/yeukfei02/weatherApi.svg?branch=master)](https://travis-ci.com/yeukfei02/weatherApi)
[![codecov](https://codecov.io/gh/yeukfei02/weatherApi/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/weatherApi)

weatherApi by openweathermap

documentation: https://documenter.getpostman.com/view/3827865/SzezdXua?version=latest

## Requirement:
 - install yarn
 - install node (v12+)
 - install mongodb

## Testing and run:
```
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

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/weather-api:<tag> .
docker run -p 3000:3000 -d <username>/weather-api:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost:3000

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```

build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/weatherApi/blob/master/CONTRIBUTING.md)
