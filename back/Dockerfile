FROM php:8.2-fpm

# Instalando dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# diretório de trabalho
WORKDIR /var/www/html/back

COPY . .

RUN cp .env.example .env

# Instalando as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Subindo banco de dados
RUN php artisan migrate:fresh
RUN php artisan db:seed UsersTableSeeder

# Limpando cache
RUN php artisan config:clear
RUN php artisan config:cache

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000