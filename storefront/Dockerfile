# Use Node.js LTS as the base image
FROM node:20.18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js app (if applicable)
RUN npm install
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
