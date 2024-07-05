FROM php:8.2-fpm

# set your user name, ex: user=bernardo
ARG user=dev_lms
ARG uid=1000
ARG DB_DATABASE
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_HOST

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \    
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    libzip-dev 

RUN apt-get install nano -y

RUN apt-get install supervisor -y

RUN apt-get install -y nginx  && \
    rm -rf /var/lib/apt/lists/*


# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets zip
# Install redis
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis
    
COPY ./deploy/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0"

ADD ./deploy/opcache.ini "$PHP_INI_DIR/conf.d/opcache.ini"


# Prestissimo is a spiffing plugin
#RUN composer global require hirak/prestissimo --no-plugins --no-scripts

WORKDIR /var/www/html

# copy env file

# Copy codebase
COPY . ./

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user
    
RUN mkdir -p /var/log/lms/ && \
    chown -R $user:$user /var/log/lms/

# Define as permissões do diretório public para garantir que o PHP possa escrever nele
RUN chown -R www-data:www-data /var/www/html/public
RUN chmod -R 755 /var/www/html/public

RUN docker-php-ext-configure gd --with-jpeg && \
    docker-php-ext-install gd 
RUN rm /etc/nginx/sites-enabled/default

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/deploy.conf /etc/nginx/conf.d/default.conf

RUN mv /usr/local/etc/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/www.conf.backup
COPY ./deploy/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

RUN usermod -a -G www-data root
RUN chgrp -R www-data storage

RUN chown -R www-data:www-data ./storage
RUN chmod -R 0777 ./storage

RUN chmod +x ./deploy/run

# create a Symlink that references  your  error log
RUN ln -s /app/storage/logs /opt/logs

RUN cat .env

ENTRYPOINT ["./deploy/run"]

EXPOSE 80
