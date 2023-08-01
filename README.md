Getting Started


Application made in Node/Express/TS following the principles of DDD and Clean Architecture

There are 5 routes so far

http://localhost:5050/api/cities
http://localhost:5050/api/cities/city-name
http://localhost:5050/api/provinces
http://localhost:5050/api/provinces/:province-name
http://localhost:5050/api/entities/:entity  (Entity can be either city or province)

You have two ways to run this project:

First, you need to create a .env file based on the .env.exemple file.

Make sure to fill all the variables especially NODE_ENV with development or production, this will determine the following command.

# or
make app-production
You can check the Makefile to see all the options or run make help to see all the commands.

In production mode the app will be all set up and ready to go.

If you are in development mode, you need to install the dependencies and run the migrations and seeds:
Install dependencies:

yarn
Run the migrations:
yarn prisma migrate

Run the seeds:

yarn prisma db seed
2. Use Local Node
Node
First, install the dependencies:

yarn
Then, build the project:

yarn build
Finally, start the development server:

yarn dev
Database

You need to have a PostgreSQL database running on your machine or online.

You can configure the database connection on the .env.

After that, you need to push the migrations to the database:

yarn prisma migrate deploy
Then, run the seeds to populate the database:

yarn prisma db seed

To run the project do "npm start"
to run only unit tests do "npm run "test:unit"
to run only integration tests do "npm run "test:intergration"
to run all the tests do "npm testt"
