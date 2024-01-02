FROM node:18-alpine
RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install --build-from-source bcrypt
# 暴露端口
EXPOSE 5000

CMD [ "node", "app.js" ]