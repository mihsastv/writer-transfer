<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

#Service Writer

## Описание задания

Тестовое задание:

Задача: реализовать приложение, которое осуществляет передачу больших объемов данных (например файлов) через систему обмена сообщениями NATS (https://nats.io/). Приложение должно состоять из 2х сервисов Reader и Writer, которые можно запустить на разных серверах (Для тестирования можно запускать 2 сервиса на одной машине, главное чтобы использовался выбранный транспорт) Сервис Reader должен осуществлять чтение и передачу данных Сервис Writer должен принимать данные от сервиса Reader, обрабатывать их и сохранять Дополнительно:
1. Обработать ситуацию, когда сервис Reader отправляет сервису Writer больше данных, чем тот может обработать. Для примера, перед записью в сервисе Writer обрабатывайте входящие данные с помощью этого метода: const processData = (data) => { return new Promise(resolve => { setTimeout(() => { resolve(data); }, 500); });
2. Реализовать поддержку различных видов транспортов (например websockets) (Возможно дополнительно поддержать обработку раличных видов данных);
3. Покрыть тестами.

## Описание выполнения

Реализовано два сервиса Writer и Reader при запуске Reader в командной строке необходимо ввести путь к файлу для передачи.
С сервисом Writer взаимодействия не требуются, кроме запуска



## Platform
>* NATS (Для запуска необходим сервер, для разработки можно использовать
   > docker-compose.yml из корня проекта)
>* SocketIO (не требует установки)
>* NodeJs
>* NestJs

## Пример ENV файла для Writer
Указанные параметры используются по умолчанию

````dotenv
MAIN_PATH = '/Users/mihsastv/Downloads/'
HIGH_WATERMARK = 1000
NATS_URL = 'nats://localhost:4222'

#Выбрать транспорт, по умолчанию NATS
SELECT_TRANSPORT='NATS'
````

## Installation
Для локальной установки postgres требуется
установка
docker-compose https://docs.docker.com/compose/install/

Также необходимо установить

node js https://nodejs.org/en/download/

nest js https://docs.nestjs.com/

После установки из корня проекта выполнить
``` shell script
$ docker-composer up 
```
После этого

``` shell script
$ npm install
```

## Запуск приложения

```bash

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
