FROM node:18-alpine

ENV CLIENT_PORT=3030

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install
# 暴露端口
EXPOSE 4000

CMD [ "node", "app.js" ]