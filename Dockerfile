FROM node:16 
WORKDIR /app
COPY package.json .
COPY . . 
RUN npm install
EXPOSE 5500
CMD node app.js on_demand.yaml
