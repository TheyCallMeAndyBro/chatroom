FROM node:18-alpine

ENV PORT=3000

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install
# 暴露端口
EXPOSE 3030

CMD [ "npm", "start"]