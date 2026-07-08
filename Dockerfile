# Stage 1: Build stage
FROM node:20-slim AS builder

# Install build tools needed for native dependencies (like argon2)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy dependency configuration files
COPY package*.json ./

# Install all dependencies (production + development)
RUN npm ci

# Prune development dependencies to keep the image slim
RUN npm prune --production


# Stage 2: Production run stage
FROM node:20-slim

WORKDIR /usr/src/app

# Copy production node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Run the application
CMD ["npm", "start"]
