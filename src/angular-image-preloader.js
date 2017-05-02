'use strict';

const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';

const _escapeUrlProtocol = function(url) {
  return url.replace(/^https?\:\/\//i, '//');
};

export const preLoader = () => ((url, successCallback, errorCallback) => {
  angular.element(new Image()).bind('load', function () {
    successCallback();
  }).bind('error', function () {
    errorCallback();
  }).attr('src', url);
});

export const preloadImage = (preLoader) => ({
  restrict: 'A',
  terminal: true,
  priority: 100,
  link: (scope, element, attrs) => {
    scope.default = attrs.defaultImage || fallbackImage;

    attrs.$observe('ngSrc', () => {
      var url = _escapeUrlProtocol(attrs.ngSrc);

      attrs.$set('src', scope.default);

      preLoader(url, () => {
        attrs.$set('src', url);
      }, () => {
        if (attrs.fallbackImage != undefined) {
          attrs.$set('src', attrs.fallbackImage);
        }
      });
    })
  }
});

export const preloadBgImage = (preLoader) => ({
  restrict: 'A',
  link: (scope, element, attrs) => {
    if (attrs.preloadBgImage != undefined) {
      scope.default = attrs.defaultImage || fallbackImage;

      attrs.$observe('preloadBgImage', () => {
        element.css({
          'background-image': `url("${scope.default}")`
        });
        preLoader(attrs.preloadBgImage, () => {
          element.css({
            'background-image': `url("${attrs.preloadBgImage}")`
          });
        }, () => {
          if (attrs.fallbackImage != undefined) {
            element.css({
              'background-image': `url("${attrs.fallbackImage}")`
            });
          }
        });
      });
    }
  }
});
