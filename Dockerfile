# Base image
FROM node:latest

# Create app directory 
WORKDIR /usr/front

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install app dependencies
RUN npm i 


# Bundle app source
COPY . .


EXPOSE 8000

# Start the server using the production build
CMD [ "npm", "run", "dev" ]