FROM node:10.12

COPY . .

RUN npm i -g yarn

RUN yarn run build --production

RUN yarn install -g serve

CMD serve -s build -p 3000

EXPOSE 3000
