FROM node:22-alpine AS build
WORKDIR /app
COPY package.json scripts/copy-frontend.mjs ./scripts/
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN npm install --prefix frontend && npm install --prefix backend
COPY frontend ./frontend
COPY backend ./backend
RUN npm run build --prefix frontend && npm run build --prefix backend && node scripts/copy-frontend.mjs

FROM node:22-alpine
WORKDIR /app/backend
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/public ./public
EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/main.js"]
