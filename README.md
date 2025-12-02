# Setup

Install docker
`docker-compose up`

Log into docker container
`docker exec -it travel_orders bash`

Install admin
`cd /var/www/travel_orders/admin`
`npm install`

Run admin with
`npm start`

Install api
`cd /var/www/travel_orders/api`
`composer install`

Install core
`cd /var/www/travel_orders/core`
`composer install`

Core - Setup .env file (see .env.example)

Run migrations
`cd /var/www/travel_orders/core`
`vendor/bin/phinx migrate`

# setup logs folder

`mkdir /var/www/travel_orders/api/logs`
`chmod 777 /var/www/travel_orders/api/logs`

# Setup storage

setup storage folder symlinks

`ln -s /var/www/travel_orders/core/storage /var/www/travel_orders/api/storage`
