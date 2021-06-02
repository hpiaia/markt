# Markt - Jobsity's coding test

This project was developed with the intention of being a code test for Jobsity, you can find more about the challenge at the original PDF file that was sent to me [here](https://github.com/hpiaia/markt/blob/main/challenge.pdf). 

The project is live and published on DigitalOcean and Vercel and can be tested at this link.

[markt.hpiaia.dev](https://markt.hpiaia.dev/)

## Architecture
The challenge consists of a simple browser-based chat application using NodeJS where several users can talk and send commands to the application to get stock quotes.

To achieve that, as the challenge itself suggested, the application was separated into three services:

 - **API**: This service is responsible for handling all the incoming HTTP requests from the user. (authentication, list rooms, create rooms, etc) and also has a WebSocket endpoint that handles the chat business-logic (join into a room, send a message, retrieve messages, etc).
 - **BOT**: This service is responsible for handling commands that are send for the application via chat. It runs asynchronously and communicates with the API service via RabbitMQ. 
 - **WEB**: This is the frontend application that runs on the users browser, it contemplates the user interface and communicates with the API service via HTTP or WebSocket requests.

Below is a diagram of the architecture and communication between the services: 

![communication diagram](https://raw.githubusercontent.com/hpiaia/markt/main/diagram.png)

## Technologies
This section describes every technology used in the project, divided by application.

 - **API**
	 - Typescript
	 - NestJS
	 - Prisma ORM
	 - PassportJS
	 - JWT
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

## Running the project locally

### Run with Docker Compose

All the applications are dockerized, you can run everything with a simple docker compose command.

```bash
docker compose up
```

### Run without Docker

If you want, you can run the applications with NodeJS and without docker, but first you need to make sure you have the RabbitMQ and Postgres services up and running.

To run the applications with Node, run the following commands in different terminal windows.
```bash
cd /api && npm run start:dev
cd /bot && npm run start:dev
cd /web && npm run dev
```

### Environment variables

If you use docker compose, everything should work out of the box and you don't need to worry about this section, but if you are running without docker, make sure you set up the environment files following this guide.

First, duplicate the `.env.example` to a file called `.env` in the `/api` folder, then edit the variables to point to your services.

 - **PORT** - The port that the API service will run
 - **APP_SECRET** - The encription key for the authentication tokens
 - **DATABASE_URL** - The Postgres connection string
 - **RABBITMQ_URL** - The RabbitMQ connection string

Then, do the same thing with the `.env.example` file in the `/bot` folder.

 - **RABBITMQ_URL** - The RabbitMQ connection string, make sure it is the same as the API uses

Lastly, do the same thing with the `.env.example` file in the `/web` folder.

 - **NEXT_PUBLIC_API_URL** - The full url of the API endpoint
 
 
