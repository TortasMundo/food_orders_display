FROM node:10.12

COPY . .

RUN npm i -g yarn

RUN yarn install

RUN yarn run build --production

RUN yarn global add serve

RUN echo '[{"name":"kitchen-web-ui","imageUri":"421154629972.dkr.ecr.us-east-2.amazonaws.com/tortasmundo/kitchen-web-ui:latest"}]' > build/imagedefinitions.json

CMD serve -s build -p 3000

EXPOSE 3000
