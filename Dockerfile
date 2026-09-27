# Build stage for React Vite client & Express backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root & package manifests
COPY package.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN cd server && npm install
RUN cd client && npm install

# Copy source files
COPY server ./server
COPY client ./client

# Build frontend production bundle
RUN cd client && npm run build

# Production runtime container
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json ./
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

# Install production server dependencies only
RUN cd server && npm ci --only=production

EXPOSE 8080

CMD ["node", "server/server.js"]
