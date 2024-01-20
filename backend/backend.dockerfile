FROM node:lts

WORKDIR /app

COPY package.json ./

RUN npm install

# RUN yarn build

COPY . .

EXPOSE 4000

CMD ["node", "index.ts"]
