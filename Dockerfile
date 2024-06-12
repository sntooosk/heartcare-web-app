# Estágio de construção
FROM node:latest as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build -- --prod

# Segundo estágio
FROM nginx:latest

COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
