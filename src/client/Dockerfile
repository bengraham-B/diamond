# Use official lightweight Node.js image
# FROM node:20-alpine # Use for non Apple Sillicon
# use full Debian image, not Alpine
FROM node:20-bullseye  


WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# Default value for SERVER_BASE (can be overridden by Compose)
ENV SERVER_BASE="http://localhost:8000"

CMD ["npm", "run", "start"]
