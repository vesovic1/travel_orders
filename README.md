# Setup

Install docker
`docker-compose up`

Log into docker container
`docker exec -it mycase bash`

Install admin
`cd /var/www/domtera/admin`
`npm install`

Run admin with
`npm start`

Install api
`cd /var/www/domtera/api`
`composer install`

Install core
`cd /var/www/domtera/core`
`composer install`

Core - Setup .env file (see .env.example)

Run migrations
`cd /var/www/domtera/core`
`vendor/bin/phinx migrate`

# setup logs folder

`mkdir /var/www/domtera/api/logs`
`chmod 777 /var/www/domtera/api/logs`

# Setup storage

setup storage folder symlinks

`ln -s /var/www/domtera/core/storage /var/www/domtera/api/storage`
