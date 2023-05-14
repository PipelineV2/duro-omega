FROM node:alpine

WORKDIR /src

COPY ./package.json ./
RUN npm i --only=prod
COPY ./ ./

CMD ["npm", "start"]