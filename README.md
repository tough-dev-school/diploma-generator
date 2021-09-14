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

## How to create a new template

First, you have to create and svg image out of the mock-up. Here is an example using figma:
![Create an SVG using figma](https://user-images.githubusercontent.com/1592663/133264066-411ad45a-d4f4-4c18-a353-377a9c57a386.png)

Second, convert it tu utf-8. for text to become readable by a human. In MacOS or Linux: `xmllint --format --encode utf-8 downloaded.svg > downloaded-readble.svg`
.

Third, create a text template out of the SVG, using nonjucks [variable substitution](https://mozilla.github.io/nunjucks/templating.html#variables) and [condigitional tags](https://mozilla.github.io/nunjucks/templating.html#if). Place the resulting file to the templates/ folder and voila!
