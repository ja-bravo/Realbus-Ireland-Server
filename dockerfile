FROM  node:8
   
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package.json /usr/src/app/

RUN npm install

COPY ./src /usr/src/app/src

EXPOSE 3006

CMD [ "npm", "run", "dev" ]