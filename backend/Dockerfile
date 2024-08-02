FROM php:7.4-apache-buster

# Install required packages
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    && docker-php-ext-install mysqli zip

# Install composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create working directory
WORKDIR /var/www/html

# Install dependencies
COPY composer.json composer.lock ./
RUN composer install

# Install phpdotenv
RUN composer require vlucas/phpdotenv

# Copy your application files
COPY . .

# Expose port 80 for Apache
EXPOSE 80