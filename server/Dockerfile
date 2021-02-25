FROM node:12
WORKDIR ./src/app.js
COPY ./package.json ./package-lock.json
RUN npm install
COPY ..
EXPOSE 5000
CMD ["npm","run","dev"]