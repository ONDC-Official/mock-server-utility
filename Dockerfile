FROM node:16 
WORKDIR /app
COPY package.json .
COPY . . 
EXPOSE 5500
CMD node app.js
