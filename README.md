# house-of-books-api
## step by step to run the project

1) To install all dependencies, run: `npm install`
2) Before running the project you will need to create a network in Docker: `docker network create house-of-books-api`
3) And also set the environment variables in the `.env` file
4) To upload and run the PostgreSQL application and database on Docker: `docker-compose up`
5) After running the previous command, it will also be necessary to run the migrations and seeders: `npm run start:db`
6) Finally, to have access to all the endpoints available in the API, just click the button below to import the Insomnia workspace:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=House%20of%20Books%20API&uri=https%3A%2F%2Fgithub.com%2Fivansimplicio%2Fhouse-of-books-api%2Fblob%2Fmaster%2F_files%2Fworkspace-house-of-books-api.json)
