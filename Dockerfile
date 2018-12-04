FROM node:8
WORKDIR /var/www
RUN chown -R node:node /var/www
USER node
CMD ['npm', 'start']