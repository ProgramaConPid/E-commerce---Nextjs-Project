# ========================================
# ETAPA 1: Build de la app
# ========================================
FROM node:20-bullseye AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ========================================
# ETAPA 2: Imagen ligera para producción
# ========================================
FROM node:20-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Copiar la build generada
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./   

EXPOSE 3000
CMD ["npm", "run", "start"]
