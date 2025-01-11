FROM node:20-alpine

WORKDIR /nextapp

COPY package.json pnpm-lock.yaml ./
 

RUN npm i pnpm -g

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run" ,"dev"]