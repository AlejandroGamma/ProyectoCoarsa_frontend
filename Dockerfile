# Build and compile the frontend
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/ --configuration production

# Get the compiled app ready to be served with Nginx
FROM nginx:latest
COPY --chown=nginx:nginx --from=build-stage /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


### chown -R nginx:nginx /usr/share/nginx/html escribir en la consola de docker
# --chown=nginx:nginx
