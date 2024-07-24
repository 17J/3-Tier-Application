# Use a base PHP image
FROM php:7.4-apache

RUN docker-php-ext-install mysqli
# Copy your application files
COPY . /var/www/html

# Expose port 80 for Apache
EXPOSE 80
