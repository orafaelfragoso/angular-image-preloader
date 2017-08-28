# Angular Image Preloader [![Build Status](https://travis-ci.org/rafaelfragosom/angular-image-preloader.svg?branch=master)](https://travis-ci.org/rafaelfragosom/angular-image-preloader) [![npm version](https://badge.fury.io/js/angular-image-preloader.svg)](https://badge.fury.io/js/angular-image-preloader) [![Bower version](https://badge.fury.io/bo/angular-image-preloader.svg)](https://badge.fury.io/bo/angular-image-preloader)

Asynchronous Image Preloader Directive for Angular 1.X.

## Why?

Images load syncronously. The only problem is that they are render blocking and browsers only let you do limited concurrent requests to specific domains ([See this](http://sgdev-blog.blogspot.com.br/2014/01/maximum-concurrent-connection-to-same.html)). I made this AngularJS directive to get around this issue on projects that servers large datasets of images from different domains, like the project this was built for.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See usage for notes on how to use the project on a live project.

### Prerequisites

AngularJS 1.X

### Installing

Install it with NPM, Bower or Yarn:

```bash
npm install --save angular-image-preloader
bower install --save angular-image-preloader
yarn add angular-image-preloader
```

After installed and imported to the project, you should be able to load the module like so:

```js
angular.module('your-module', ['angular-image-preloader']);
```

## Using

Asynchronously loading images with img:

```html
<img preload-image ng-src="your-image.jpg"
     default-image="a-default-image.jpg"
     fallback-image="a-fallback-image.jpg" />
```

Asynchronously loading background images with CSS:

```html
<div preload-bg-image="your-image.jpg"
     default-image="a-default-image.jpg"
     fallback-image="a-fallback-image.jpg"></div>
```

Executing a callback after image loads:
```html
<div on-img-load="callback()"
     preload-bg-image="your-image.jpg"
     default-image="a-default-image.jpg"
     fallback-image="a-fallback-image.jpg"></div>
```

## Built With

* [Angular 1.X](https://angularjs.org/) - The web framework this was built for
* [Webpack 2](https://webpack.js.org/) - Package Bundler

## Contributing

Please read [CONTRIBUTING.md](https://github.com/rafaelfragosom/angular-image-preloader/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/rafaelfragosom/angular-image-preloader/tags).

## Authors

* **Rafael Fragoso** - *Initial work* - [rafaelfragosom](https://github.com/rafaelfragoso)

See also the list of [contributors](https://github.com/rafaelfragosom/angular-image-preloader/contributors) who participated in this project.

## TODO

- Tests

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rafaelfragosom/angular-image-preloader/blob/master/LICENSE) file for details
