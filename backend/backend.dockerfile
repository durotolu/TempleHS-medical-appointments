FROM node:lts
# FROM node:14.16.0-slim

WORKDIR /app

COPY package.json ./

RUN npm install

# COPY knexfile.js ./

# RUN npx knex generate

# RUN yarn build

COPY . .

EXPOSE 4000

CMD ["node", "index.ts"]
# CMD ["npm", "run", "start"]
