import angular from 'angular';
import { preLoader, preloadImage, preloadBgImage } from './angular-image-preloader';

const MODULE_NAME = 'angular-image-preloader';

angular.module(MODULE_NAME, [])
  .factory('preLoader', preLoader)
  .directive('preloadImage', ['preLoader', preloadImage])
  .directive('preloadBgImage', ['preLoader', preloadBgImage]);

export default MODULE_NAME;
