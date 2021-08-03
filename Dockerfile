FROM node:14.15.3
WORKDIR /app
COPY . /app
RUN rm -rf node_modules
RUN npm install
RUN npm run prod:start
