FROM node:21
WORKDIR /app
COPY . .

ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=admin
ENV MONGO_DATABASE=miaudote
ENV MONGO_HOST=miaudote.rtjemoz.mongodb.net
ENV JWT_SECRET=RVVBTU9PTUlBVURPVEVQT0lTQURPUk9BTklNQUlTREVFU1RJTUFDQU8=
ENV MONGO_URL=mongodb+srv://admin:admin@miaudote.rtjemoz.mongodb.net/?retryWrites=true&w=majority&appName=miaudote

RUN yarn install 

CMD ["yarn", "run", "start:dev"]

EXPOSE 3000