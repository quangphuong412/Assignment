FROM node:22-alpine

WORKDIR /home/nodeexpress

COPY . /home/nodeexpress

RUN npm install

ENV PORT 3000

EXPOSE 3000

CMD ["node","index.js"]