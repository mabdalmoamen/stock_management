<!-- First Download any server like laragon php8 from link
 https://laragon.org/download/index.html 
 
 -->
Extract Project inside C:/laragon/www 
Add your own database credentials in the .env file in DB_DATABASE, DB_USERNAME, DB_PASSWORD
open cmd or powershell in project folder

Create database table: php artisan migrate --seed
Generate application key: php artisan key:generate
run Project by: php artisan serve

open generated link :http://127.0.0.1:8000/
