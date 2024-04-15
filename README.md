# CLI TODOs consumer tool

> Summary: This is a review submission for a CLI tool built as part of a code exercise, to consume the first 'n' even or odd numbered TODOs from a pre-determined resource URL and output the title and whether it is completed or not.

## The TL;DR

- This CLI tool has been built as `Node.js` CLI application.
- The command supports two options to configure both the number of TODOs that get consumed and whether to read `even` or `odd` numbered TODOs.
- The code is well tested, using the Jest JavaScript Testing Framework.
- A simple `Dockerfile` is included so the tool can be run in a container.

## Running the tests

You can run the unit tests using the following commands:

```bash
npm install
NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npm test

# run this command to get code coverage
NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest --coverage
```

## Running the Tool via Docker

This is the recommended way to quickly get up and running so you can test out the tool. First make sure you have [Docker](https://docs.docker.com/get-docker/) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your host machine. Then do the following:

1. Clone the repository to your local environment.

2. Navigate to the project's root directory, then build the image:

   ```bash
   cd path/to/project
   docker build -t cli-todos-container .
   ```

3. Run the CLI tool in your container:

   ```bash
   docker run cli-todos-container
   ```

4. You can pass options to configure the number of TODOs to consume and whether to consume even or odd numbered TODOs, like so:

   ```bash
   docker run cli-todos-container --count 5 --selection odd
   ```

### Pass any of the supported CLI options to the container

You can pass any supported options for the CLI tool as arguments to the container and they will be passed along to the tool. Example:

```bash
docker run cli-todos-container --help
```

```
Usage: todos-consumer [options]

Consume the first 'n' even or odd numbered TODOs from a pre-determined resource
URL and output the title and whether it is completed or not.

Options:
  -V, --version                 output the version number
  -c, --count <count>           The number of TODOs to consume. Must be >= 1.
                                (default: 20)
  -s, --selection <even | odd>  The selection of TODOs to consume, if even or
                                odd numbered. (default: "even")
  -h, --help                    display help for command
```
