# Dockerfile
FROM php:8.1-apache

ENV PHP_DATE_TIMEZONE="Europe/Belgrade"

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN docker-php-ext-install pdo pdo_mysql mysqli

# RUN chown -R www-data:www-data /var/www

RUN apt-get update && apt-get install -y libmagickwand-dev --no-install-recommends
RUN pecl install imagick
RUN docker-php-ext-enable imagick

RUN apt-get update

RUN apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

RUN apt-get install -y \
    libxml2-dev \
    && docker-php-ext-install soap

RUN apt-get -y update \
    && apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN install-php-extensions mbstring

RUN install-php-extensions gd

#needed for mongo
RUN apt-get update && apt-get install -y --no-install-recommends libcurl4-openssl-dev pkg-config libssl-dev
RUN pecl install mongodb \
    && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/ext-mongodb.ini

RUN docker-php-ext-install sockets


# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl fontconfig libfreetype6 libjpeg62-turbo libpng16-16 \
    libx11-6 libxcb1 libxext6 libxrender1 xfonts-base xfonts-75dpi \
  && rm -rf /var/lib/apt/lists/*

# Download Bookworm build (works fine on Trixie — uses libssl3)
ENV WKHTML_DEB=wkhtmltox_0.12.6.1-3.bookworm_amd64.deb
RUN curl -L -o "/tmp/${WKHTML_DEB}" \
      "https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-3/${WKHTML_DEB}" \
  && apt-get update \
  && apt-get install -y --no-install-recommends /tmp/${WKHTML_DEB} \
  && rm -rf /var/lib/apt/lists/* /tmp/${WKHTML_DEB}

# Quick self-test
RUN wkhtmltopdf --version


RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN apt-get update && apt-get install -y git

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/travel_orders

ENV CHOKIDAR_USEPOLLING=true

CMD ["apache2-foreground"]