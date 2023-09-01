## BUILD STAGE
# FROM Is used to define which base image should be used
FROM node:14-alpine AS build

# WORKDIR defines the working directory for our build stage
WORKDIR /trainee_frontend_build

# COPY is used to copy package.json to our working directory in container
COPY package.json .

# RUN is used to create new layer and is executed during build stage - Install dependencies
RUN npm install

# COPY is used to copy all source code in our container working directory
COPY .  .

# RUN is  used to create build layer for the project
RUN npm run build

## RUNNING STAGE
# base image for our runnign stage
FROM nginx:1.17.0-alpine

# working directory of the container
WORKDIR /usr/share/nginx/html

# COPY build folder from build stage
COPY --from=build /trainee_frontend_build/build .
#COPY ./default.conf /etc/nginx/conf.d/default.conf

# STARTING NGINX
CMD ["nginx", "-g", "daemon off;"]