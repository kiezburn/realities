# base on latest node 9.8.x image
FROM node:8.9

# Install dependencies
# build-essential: Needed for many gems
# postgresql-client: used DB
# git: needed for bundle for some gems
# libpq-dev: pg gem (postgres gem)
# imagemagick libmagickcore-dev libmagickwand-dev: for rmagick gem
# libsqlite3-dev: for sqlite3 gem
# nodejs: for uglifier gem (js compression)
RUN apt-get -y update && apt-get -y install vim git npm
RUN npm i npm@latest -g


ENV PROJECT_PATH /realities
RUN mkdir -p  $PROJECT_PATH
WORKDIR $PROJECT_PATH


# First copy dependencies to not recreate unnecessary layers
# COPY package*.json ./
RUN mkdir api ui
COPY api/package*.json api/
COPY ui/package*.json ui/

COPY package*.json ./
RUN npm install --unsafe-perm
COPY . .
COPY api/* api/
COPY ui/* ui/

COPY certificate.pem certificate.pem
COPY key.pem certificate_key.pem
#CMD ["source","env_test"]
#CMD ["nodemon", "/nodeapp/server.js"]

# for dev
CMD ["npm", "start"]

# for production
#CMD ["npm", "run-script", "serve"]

