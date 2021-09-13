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
