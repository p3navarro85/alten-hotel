FROM node:latest
RUN npm install nodemon -g
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"] 
