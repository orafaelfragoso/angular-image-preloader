const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';

const escapeUrlProtocol = url => url.replace(/^https?:\/\//i, '//');

export const preLoader = () => ((url, successCallback, errorCallback) => {
  angular.element(new Image()).bind('load', () => {
    successCallback();
  }).bind('error', () => {
    errorCallback();
  }).attr('src', url);
});

export const preloadImage = (preloader, $parse) => ({
  restrict: 'A',
  terminal: true,
  priority: 100,
  link: (scope, element, attrs) => {
    scope.default = attrs.defaultImage || fallbackImage; // eslint-disable-line

    attrs.$observe('ngSrc', () => {
      const url = escapeUrlProtocol(attrs.ngSrc);
      attrs.$set('src', scope.default);

      preloader(url, () => {
        attrs.$set('src', url);
      }, () => {
        if (attrs.fallbackImage !== undefined) {
          attrs.$set('src', attrs.fallbackImage);
        }
      });
    });

    const fn = $parse(attrs.onImgLoad);
    element.bind('load', (event) => {
      scope.$apply(() => {
        fn(scope, {
          $event: event,
        });
      });
    });
  },
});

export const preloadBgImage = preloader => ({
  restrict: 'A',
  link: (scope, element, attrs) => {
    if (attrs.preloadBgImage !== undefined) {
      scope.default = attrs.defaultImage || fallbackImage; // eslint-disable-line

      attrs.$observe('preloadBgImage', () => {
        element.css({
          'background-image': `url("${scope.default}")`,
        });
        preloader(attrs.preloadBgImage, () => {
          element.css({
            'background-image': `url("${attrs.preloadBgImage}")`,
          });
        }, () => {
          if (attrs.fallbackImage !== undefined) {
            element.css({
              'background-image': `url("${attrs.fallbackImage}")`,
            });
          }
        });
      });
    }
  },
});
