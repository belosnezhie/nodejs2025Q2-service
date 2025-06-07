# Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS dev
CMD ["npm", "run", "start:dev"]

FROM deps AS prod
CMD ["npm", "run", "start:prod"]
