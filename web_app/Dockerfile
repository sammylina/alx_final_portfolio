FROM node:lts-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json  ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

FROM node:18-alpine
EXPOSE 80
COPY --from=build-step /app/build /usr/share/caddy
