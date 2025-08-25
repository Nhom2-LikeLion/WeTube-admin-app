RUN npm ci

COPY . .

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./

EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]