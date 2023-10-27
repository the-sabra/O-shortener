FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/

ARG NODE_ENV

RUN if ["${NODE_ENV}" = "production"]; \
    then npm install --only=production; \
    else npm install; \
    fi
    
COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

 