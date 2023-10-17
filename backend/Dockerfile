FROM node:18-alpine
 
WORKDIR /user/src/api
 
COPY . .
 
RUN npm ci
 
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]