FROM node:22-alpine AS build
WORKDIR /app
COPY car-rental-ui/package.json car-rental-ui/package-lock.json ./
RUN npm ci
COPY car-rental-ui .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/car-rental-ui/browser /usr/share/nginx/html
EXPOSE 80
