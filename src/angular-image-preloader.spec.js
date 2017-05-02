import app from '../src';

describe('angular-image-preloader', () => {
  let element, scope;

  beforeEach(angular.mock.module(app));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    let $rootScope = _$rootScope_,
        $compile = _$compile_;

    scope = $rootScope.$new();

    element = angular.element('<image preload-image ng-src="" />');

    $compile(element)(scope);
  }));

  it('Should be true', () => {
    expect(true).toBe(true);
  });
});
