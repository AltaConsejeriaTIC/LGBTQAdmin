FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

FROM nginx

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html