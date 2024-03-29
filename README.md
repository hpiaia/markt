# Markt - Jobsity's coding test

This project was developed with the intention of being a code test for Jobsity, you can find more about the challenge at the original PDF file that was sent to me [here](https://github.com/hpiaia/markt/blob/main/challenge.pdf). 

The challenge consists of a simple browser-based chat application using NodeJS where several users can talk and send commands to the application to get stock quotes.

The project is live and published on DigitalOcean and Vercel and can be tested at the link below.

[markt.hpiaia.dev](https://markt.hpiaia.dev/)

## Table of Contents 

 - [Features](#features)
 - [Architecture](#architecture)
 - [Technologies](#technologies)
 - [Running the project locally](#run-locally)
	 - [Environment variables](#environment-variables)
	 - [Database migration](#database-migration)
	 - [Running the applications](#running-the-applications)

## Features <a name="features"></a>

 - Multi room  — users can create rooms at the home page
 - Real time — messages arrive in no time
 - Easy to implement new commands — just implement a new method in [the service](https://github.com/hpiaia/markt/blob/main/bot/src/commands/commands.service.ts) with the command name and the application will take care of the rest

## Architecture <a name="architecture"></a> 

As the challenge itself suggested, the application was separated into three services:

 - **API**: This service is responsible for handling all the incoming HTTP requests from the user. (authentication, list rooms, create rooms, etc) and also has a WebSocket endpoint that handles the chat business-logic (join into a room, send a message, retrieve messages, etc).
 - **BOT**: This service is responsible for handling commands that are send for the application via chat. It runs asynchronously and communicates with the API service via RabbitMQ. 
 - **WEB**: This is the frontend application that runs on the users browser, it contemplates the user interface and communicates with the API service via HTTP or WebSocket requests.

Below is a diagram of the architecture and communication between the services: 

![communication diagram](https://raw.githubusercontent.com/hpiaia/markt/main/diagram.png)

## Technologies <a name="technologies"></a>

This section describes every technology used in the project, divided by application.

 - **API**
	 - Typescript
	 - NestJS
	 - Prisma ORM
	 - PassportJS with JWT
	 - RabbitMQ
	 - SocketIO
	 - Postgres
 - **BOT**
	 - Typescript
	 - NestJS
	 - RabbitMQ
 - **WEB**
	 - Typescript
	 - React
	 - NextJS
	 - TailwindCSS
	 - SocketIO

## Running the project locally <a name="run-locally"></a>

### Environment variables <a name="environment-variables"></a>

First of all, we need to setup our environment variables, so the applications can communicate correctly with the Postgres and the RabbitMQ services.

You will need both of this services running somewhere, if you want to run them locally in your machine, you can easily do it with docker using the following commands.

```bash
docker run --name markt-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
docker run --name markt-rabbit --hostname markt-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

First, duplicate the `.env.example` to a file called `.env` in the `/api` folder, then edit the variables to point to your services.

 - **PORT** - The port that the API service will run
 - **APP_SECRET** - The encription key for the authentication tokens
 - **DATABASE_URL** - The Postgres connection string
 - **RABBITMQ_URL** - The RabbitMQ connection string

Then, do the same thing with the `.env.example` file in the `/bot` folder.

 - **RABBITMQ_URL** - The RabbitMQ connection string, make sure it is the same as the API uses

Lastly, do the same thing with the `.env.example` file in the `/web` folder.

 - **NEXT_PUBLIC_API_URL** - The full url of the API endpoint
 

### Database migration <a name="database-migration"></a>

After your environment variables are all correct, you need to run the prisma migration for the database creation. To do that, simply run this command on the api folder.

```bash
cd /api && npx prisma migrate dev
```

You can find more about it at the official Prisma documentation, following [this link](https://www.prisma.io/docs/concepts/components/prisma-migrate).

### Running the applications <a name="running-the-applications"></a>

If you want, you can run the applications with NodeJS and without docker, but first you need to make sure you have the RabbitMQ and Postgres services up and running.

To run the applications with Node, run the following commands in different terminal windows.

```bash
cd /api && npm install && npm run start:dev
cd /bot && npm install && npm run start:dev
cd /web && npm install && npm run dev
```

## Thanks

I would like to thank Jobsity for the opportunity to show my work and for the consideration.

I hope you all go well.
