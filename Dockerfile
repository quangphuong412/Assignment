FROM node:18.1-alpine

WORKDIR /home/nodeapp

COPY . /home/nodeapp

RUN npm install

ENV PORT 3000

EXPOSE 3000

CMD ["node","index.js"]