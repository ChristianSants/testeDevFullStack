FROM php:8.2-fpm

# Instale as dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Defina o diretório de trabalho
WORKDIR /var/www/html/back

# Copie os arquivos do código fonte para o contêiner
COPY . .

# Copie o arquivo .env.example e renomeie para .env
RUN cp .env.example .env

# Instale as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Subindo banco de dados
RUN php artisan migrate:fresh
RUN php artisan db:seed UsersTableSeeder

# Limpando cache
RUN php artisan config:clear
RUN php artisan config:cache

# Exponha a porta que o servidor PHP-FPM está ouvindo
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000