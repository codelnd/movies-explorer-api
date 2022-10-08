# API Movies Explorer

***

## Бэкенд для сервиса Movies Explorer - дипломного проекта по профессии веб-разработчик курса [Яндекс.Практикум](https://praktikum.yandex.ru 'Яндекс Практикум').
В проекте задействованы две сущности: пользователи и новостные статьи. Схемы и модели созданы через Mongoose с валидируемыми полями. Все роуты, кроме логина и логаута, защищены мидлвэрей auth, которая проверяет Authorization и наличие в нем токена в приходящих запросах. Обращение к API происходит через роуты с валидацией запросов через Joi и celebrate. В контроллерах описана логика обработки запросов. Контроллер логина создает JWT токен сроком на неделю. В контроллере регистрации пользователя пароль хешеруется модулем bcryptjs. В проекте реализована централизованная обработка ошибок через конструкторы ошибок - конструкторы передаются в блоках catch через функцию next и далее в мидлвэр обработки ошибок handleErrors в app.js. Для логгирования запросов и ошибок используется библиотека Winston. Для разворачивания сервера используется облачный сервис Яндекс.Облако.


## Документация к API:
#### `POST /users/signup`
cоздаёт пользователя с переданными в теле `email, password и name`

#### `POST /users/signin`
проверяет переданные в теле `email и password` и возвращает `JWT token`

#### `GET /users/me`
возвращает информацию о пользователе, его `email и name` (роут защищен авторизацией)

#### `GET /movies`
возвращает все сохранённые пользователем фильмы (роут защищен авторизацией)

#### `POST /movies`
создаёт фильм с переданными в теле `country,
director,
duration,
year,
description,
image,
trailerLink,
thumbnail,
owner,
movieId,
nameRU,
nameEN` (роут защищен авторизацией)

#### `DELETE /movies/movieId`
удаляет сохранённый фильм по `id` (роут защищен авторизацией)


## Стек технологий:
![JavaScript](https://img.shields.io/badge/-JavaScript-000?style=for-the-badge&logo=javascript)
![NodeJS](https://img.shields.io/badge/-node.js-000?style=for-the-badge&logo=node.js)
![ExpressJS](https://img.shields.io/badge/-express.js-000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?style=for-the-badge&logo=mongodb)
![NGINX](https://img.shields.io/badge/-nginx-000?style=for-the-badge&logo=nginx)
![PM2](https://img.shields.io/badge/-pm2-000?style=for-the-badge&logo=pm2)
![ESLint](https://img.shields.io/badge/-eslint-000?style=for-the-badge&logo=eslint)

## Как запустить:
Клонировать репозиторий и установить зависимости.
```
git clone https://github.com/codelnd/movies-explorer-api.git
cd movies-explorer-api
npm install
```


## Планы по доработке:
- Переписать запросы на Async/Await


## CLI:
```
npm run start // Запуск dev сервера
npm run dev // Запуск dev сервера с hot reload
npm run lint // Запуск ESLint
```

## Ссылки
[Ссылка на Pull Request](https://github.com/Denis3094/movies-explorer-frontend/pull/1)

Публичный IP адрес: `51.250.107.85`

API: *https://api.findmovies.nomoredomains.xyz*







