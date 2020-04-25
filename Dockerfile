FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm cache verify
RUN npm install --only=production

ENV NODE_ENV production
ENV PORT 2200

# Bundle app source
COPY server.js ./
COPY server ./server
COPY build ./build
COPY public ./public

EXPOSE 2200
CMD [ "node", "./server.js" ]
