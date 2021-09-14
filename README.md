# Diploma generator

Render bundled SVG templates to PNG images, return them by HTTP, using
GET query string as template context.

## Installation

```sh
$ npm ci
$ npm run dev
```

## Usage

```sh
$ http GET http://<service.url>/homework-template.png?name=Константин Константинопольской&sex=m Authorzation:"Bearer: <YOUR-SECRET-TOKEN>
```

## CI and Delivery

This services gets automatically deployed to heroku upon push to the master. The docker image is built on [heroku's premises](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)
