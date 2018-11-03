FROM node:10.12

COPY . .

RUN npm run build --production

RUN npm install -g serve

CMD serve -s build -p 3000

EXPOSE 3000
