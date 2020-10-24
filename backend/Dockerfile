FROM mhart/alpine-node:10

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

ENV NODE_ENV=production

RUN npm run build
CMD [ "npm", "start" ]
