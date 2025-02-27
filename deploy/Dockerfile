FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
