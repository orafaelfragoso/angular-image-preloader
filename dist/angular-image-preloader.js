(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("angular-image-preloader", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["angular-image-preloader"] = factory(require("angular"));
	else
		root["angular-image-preloader"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return preloadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return preloadBgImage; });
var fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';

var escapeUrlProtocol = function escapeUrlProtocol(url) {
  return url.replace(/^https?:\/\//i, '//');
};

var preLoader = function preLoader() {
  return function (url, successCallback, errorCallback) {
    angular.element(new Image()).bind('load', function () {
      successCallback();
    }).bind('error', function () {
      errorCallback();
    }).attr('src', url);
  };
};

var preloadImage = function preloadImage(preloader, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100,
    link: function link(scope, element, attrs) {
      scope.default = attrs.defaultImage || fallbackImage;

      attrs.$observe('ngSrc', function () {
        var url = escapeUrlProtocol(attrs.ngSrc);
        attrs.$set('src', scope.default);

        preloader(url, function () {
          attrs.$set('src', url);
        }, function () {
          if (attrs.fallbackImage !== undefined) {
            attrs.$set('src', attrs.fallbackImage);
          }
        });
      });

      var fn = $parse(attrs.onImgLoad);
      element.bind('load', function (event) {
        scope.$apply(function () {
          fn(scope, {
            $event: event
          });
        });
      });
    }
  };
};

var preloadBgImage = function preloadBgImage(preloader) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      if (attrs.preloadBgImage !== undefined) {
        scope.default = attrs.defaultImage || fallbackImage;

        attrs.$observe('preloadBgImage', function () {
          element.css({
            'background-image': 'url("' + scope.default + '")'
          });
          preloader(attrs.preloadBgImage, function () {
            element.css({
              'background-image': 'url("' + attrs.preloadBgImage + '")'
            });
          }, function () {
            if (attrs.fallbackImage != undefined) {
              element.css({
                'background-image': 'url("' + attrs.fallbackImage + '")'
              });
            }
          });
        });
      }
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_image_preloader__ = __webpack_require__(0);



var MODULE_NAME = 'angular-image-preloader';

__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module(MODULE_NAME, []).factory('preLoader', __WEBPACK_IMPORTED_MODULE_1__angular_image_preloader__["a" /* preLoader */]).directive('preloadImage', ['preLoader', '$parse', __WEBPACK_IMPORTED_MODULE_1__angular_image_preloader__["b" /* preloadImage */]]).directive('preloadBgImage', ['preLoader', __WEBPACK_IMPORTED_MODULE_1__angular_image_preloader__["c" /* preloadBgImage */]]);

/* harmony default export */ __webpack_exports__["default"] = (MODULE_NAME);

/***/ })
/******/ ]);
});