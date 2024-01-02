FROM node:18-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install
# 暴露端口
EXPOSE 4000

CMD [ "node", "app.js" ]