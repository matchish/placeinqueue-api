FROM node:8
WORKDIR /var/www
COPY package.json .
RUN npm install
COPY . .
RUN chown -R node:node /var/www
USER node
CMD ["npm", "start"]