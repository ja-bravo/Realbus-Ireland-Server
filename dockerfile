FROM  node:8
   
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package.json /usr/src/app/

RUN npm install

COPY ./dist /usr/src/app/dist

EXPOSE 3006

CMD [ "npm", "run", "start-dev"]