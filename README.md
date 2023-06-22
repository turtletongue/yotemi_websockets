## How to run the App

You can use docker-compose to start app easily.

First of all, install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it on your machine. Make sure you follow all prerequisites.

Secondly, you must create .env file in the root folder with content like this:

```dotenv
# App Configuration

NODE_ENV=development
PORT=3030

# Redis Configuration

PUBSUB_CONNECTION=redis://:@meetlane-redis-dev:6379

# JWT Configuration

ACCESS_SECRET=secret_with_length_of_25_characters
ACCESS_EXPIRATION_TIME=1800
```

Now, you can execute this command:

```shell
# build containers and run application
docker-compose up
```

If you want to stop containers, just use:

```shell
docker-compose stop
```

If you want to remove containers, use:

```shell
docker-compose down
```

## Project Structure

`./src/common` folder contains useful services, modules, functions and decorators.

`./src/features` folder contains domain features.
