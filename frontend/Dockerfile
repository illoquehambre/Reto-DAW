# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Runtime stage
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]