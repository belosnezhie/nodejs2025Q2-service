# Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY tsconfig*.json ./
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY doc ./doc
COPY .env* ./
RUN npm install
RUN npm run build
RUN npm prune --production

# Prod
FROM node:22-alpine
COPY --from=builder /app .
EXPOSE 4000
ENV NODE_ENV=production
ENTRYPOINT ["node", "dist/main.js"]
