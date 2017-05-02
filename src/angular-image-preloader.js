const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';

const escapeUrlProtocol = function escapeUrlProtocol(url) {
  return url.replace(/^https?:\/\//i, '//');
};

export const preLoader = () => ((url, successCallback, errorCallback) => {
  const image = new Image();

  angular.element(image).bind('load', () => {
    successCallback();
  }).bind('error', () => {
    errorCallback();
  }).attr('src', url);
});

export const preloadImage = preLoader => ({ // eslint-disable-line no-shadow
  restrict: 'A',
  terminal: true,
  priority: 100,
  link: (scope, element, attrs) => {
    const defaultImage = attrs.defaultImage || fallbackImage;

    attrs.$observe('ngSrc', () => {
      const url = escapeUrlProtocol(attrs.ngSrc);

      attrs.$set('src', defaultImage);

      preLoader(url, () => {
        attrs.$set('src', url);
      }, () => {
        if (attrs.fallbackImage !== undefined) {
          attrs.$set('src', attrs.fallbackImage);
        }
      });
    });
  },
});

export const preloadBgImage = preLoader => ({ // eslint-disable-line no-shadow
  restrict: 'A',
  link: (scope, element, attrs) => {
    if (attrs.preloadBgImage !== undefined) {
      const defaultImage = attrs.defaultImage || fallbackImage;

      attrs.$observe('preloadBgImage', () => {
        element.css({
          'background-image': `url("${defaultImage}");`,
        });
        preLoader(attrs.preloadBgImage, () => {
          element.css({
            'background-image': `url("${attrs.preloadBgImage}");`,
          });
        }, () => {
          if (attrs.fallbackImage !== undefined) {
            element.css({
              'background-image': `url("${attrs.fallbackImage}");`,
            });
          }
        });
      });
    }
  },
});
