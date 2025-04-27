# Step 1: Build the app
FROM node:20 AS builder

WORKDIR /app

COPY ./FRONTEND/package*.json ./
RUN npm install

COPY ./FRONTEND .
RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
