# Base image
FROM node:latest

# Create app directory 
WORKDIR /usr/front

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install app dependencies
RUN npm install 


# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 5173

# Start the server using the production build
CMD [ "npm", "run", "preview" ]