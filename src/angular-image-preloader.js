(function() {
    'use strict';

    angular.module('angular-image-preloader', [])
      .factory('preLoader', preLoader)
      .directive('preloadImage', ['preLoader', preloadImage])
      .directive('preloadBgImage', ['preLoader', preloadBgImage]);

    function preLoader() {
      return function (url, successCallback, errorCallback) {
        angular.element(new Image()).bind('load', function () {
          successCallback();
        }).bind('error', function () {
          errorCallback();
        }).attr('src', url);
      }
    }

    function preloadImage(preLoader) {
      return {
        restrict: 'A',
        terminal: true,
        priority: 100,
        link: function (scope, element, attrs) {
          scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
          attrs.$observe('ngSrc', function () {
            var url = attrs.ngSrc;
            attrs.$set('src', scope.default);
            preLoader(url, function () {
              attrs.$set('src', url);
            }, function () {
              if (attrs.fallbackImage != undefined) {
                attrs.$set('src', attrs.fallbackImage);
              }
            });
          })
        }
      };
    }

    function preloadBgImage(preLoader) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          if (attrs.preloadBgImage != undefined) {
            scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";

            attrs.$observe('preloadBgImage', function () {
              element.css({
                'background-image': 'url("' + scope.default + '")'
              });
              preLoader(attrs.preloadBgImage, function () {
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
    }

})();
