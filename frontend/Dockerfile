FROM mhart/alpine-node:10

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=production

RUN npm run generate
CMD [ "npm", "start" ]
