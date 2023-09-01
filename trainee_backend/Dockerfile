# FROM Is used to define which base image should be used
FROM node:14-alpine

# WORKDIR defines the working directory for our build stage
WORKDIR /trainee_backend

# COPY is used to copy package.json to our working directory in container
COPY package.json ./

# RUN is used to create new layer and is executed during build stage - Install dependencies
RUN npm install

# COPY is used to copy all source code in our container working directory
COPY . .    

# ARG is used for setting dynamic environment values, ARG can't be accessed once image is built.
# ARG port

# ENV  are available during build and run stage
# ENV PORT_NUMBER=8000

# Create a non-root user & setting file ownership
RUN addgroup -S jayraj && \
    adduser -S jayraj -G jayraj && \
    chown -R :jayraj /trainee_backend

# Switch to the non-root user
USER jayraj

#EXPOSE 8000
# EXPOSE ${PORT_NUMBER}
EXPOSE 8000

# CMD is used when we run the image
CMD ["npm" , "start"]