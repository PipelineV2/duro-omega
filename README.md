# Duro_Omega

## Installation guide

- after cloning the repo, cd into the root folder
- install all dependency by runing either `yarn` or `npm install`
- if you have docker on your machine, you can spin up the database by runing `docker-compose up -d --build db` or spin it up in your favorite way.
- if you chose to use the docker-compose way, then the .env.sample file content can be directly copied to a .env file in the root, otherwise you would have to update the `MONGO_URI` value to the mongo server you have running
- then run either `yarn dev` or `npm run dev`
