FROM node:latest

LABEL kubehe <jakub.k.b@hotmail.com>

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN yarn install

EXPOSE 3000