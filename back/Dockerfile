FROM php:8.3-fpm

# Instale as dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    zip \
    unzip

# Limpe o cache de pacotes
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instale as extensões PHP necessárias
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo_mysql zip

# Instale o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configure o diretório de trabalho
WORKDIR /var/www

# Copie o código fonte do Laravel para o contêiner
COPY . .

# Instale as dependências do Composer
RUN composer install --no-dev --optimize-autoloader

# Configure as permissões necessárias para o Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exponha a porta 9000 para que o Nginx possa se comunicar com o PHP-FPM
EXPOSE 9000

# Inicie o PHP-FPM
CMD ["php-fpm"]

