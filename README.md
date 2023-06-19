# O-shortener Overview

The O-shortener is a URL shortening application that converts long URLs into manageable links that won’t break in email postings.

## Technologies Used
- NestJS, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- MySQL, a relational database management system.
- Prisma, an open-source database ORM (Object-relational mapping).
- TypeScript, a strongly typed superset of JavaScript.
- Jest, a delightful JavaScript Testing Framework with a focus on simplicity.

## API Endpoints
- `POST /auth/signup`: Register a new user.
- `GET /:short_code`: Redirect to the original URL associated with the given short code.

Refer to the [API Documentation](https://documenter.getpostman.com/view/22968167/2s93sabtNc) for detailed documentation and examples.

## Installation Process

1. Clone the repository by using the following command: `git clone https://github.com/omarsabra1/O-shortener`.
2. Navigate into the cloned repository: `cd o-shortener`.
3. Install the necessary dependencies: `npm install`.

## Running the Application

- To run the app in development mode, use: `npm run start`.
- To run the app in watch mode, use: `npm run start:dev`.
- To run the app in production mode, use: `npm run start:prod`.

## Code Structure

The application code is organized as follows:

- `main.ts`: The entry point of the application.
- `urls/controller/urls.controller.ts`: Manages the creation of shortened URLs.
- `prismaService`: Connects to Prisma Client.
- `app.controller.ts`: Manages the redirection to original URLs.
- `auth/controller/auth.controller.ts`: Manages user authentication and creation.
- `auth/guard/auth/auth.guard.ts`: Verifies JWT tokens.

Note: The controllers manage the routes, while the services handle the business logic and connect to the ORM.

## License

O-shortener is [MIT licensed](LICENSE.txt).

## Contact Information

Feel free to reach out on LinkedIn or via email.
