FROM node:10.12

COPY . .

RUN npm i -g yarn

RUN yarn install

RUN yarn run build --production

RUN yarn global add serve

CMD serve -s build -p 60001

EXPOSE 60001
