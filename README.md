# Miaudote Back-end

This application is a [NestJS](https://nestjs.com/) project managed using Docker and Docker Compose. Follow the instructions below to get started.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Henrique-Gomesz/miaudote
cd miaudote
```

### 2. Build and Start the Containers

To build and start the Docker containers, run the following command:

```bash
make up
```

### 3. Stop the Containers

To stop the running containers, use the following command:

```bash
make down
```

## Makefile Commands

- **up**: Start the Docker containers in detached mode.
- **up-logs**: Start the Docker containers and view the logs.
- **down**: Stop the Docker containers.
- **migrate-up**: Run the migrations.
- **migrate-down**: Revert the migrations.
