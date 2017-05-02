import app from '../src';

describe('angular-image-preloader', () => {
  let element;
  let scope;

  beforeEach(() => angular.mock.module(app));

  beforeEach(inject((_$rootScope_, _$compile_) => {
    const $rootScope = _$rootScope_;
    const $compile = _$compile_;

    scope = $rootScope.$new();

    element = angular.element('<image preload-image ng-src="" />');

    $compile(element)(scope);
  }));

  it('Should be true', () => {
    expect(true).toBe(true);
  });
});
