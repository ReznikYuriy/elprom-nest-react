FROM node:18-alpine
 
WORKDIR /user/src/api
 
RUN chown -R node:node /user/src/api

COPY --chown=node:node package*.json .
 
RUN npm ci

COPY --chown=node:node . .


 
RUN npm run build

RUN chown -R node /user/src/api/dist/modules/*
 
USER node
 
CMD ["npm", "run", "start:prod"]