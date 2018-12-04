FROM node:8
WORKDIR /var/www
USER node
CMD ['npm', 'start']