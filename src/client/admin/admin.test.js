import { expect } from 'chai';
import { isAnAngularObjectWithDependencies } from '../../../test/utils';

import { module as admin, default as name } from './admin.module';
import routes from './admin.routes';

describe('Module: Admin', () => {
  describe('Module', () => {
    isAnAngularObjectWithDependencies(admin);

    it('default export should be a string called app.admin', () => {
      expect(name).to.be.a('string').and.equal('app.admin');
    });
  });

  describe('Routes', () => {
    const stateProviderMock = { state: () => {} };
    it('should return an array of states', () => {
      const states = routes(stateProviderMock);
      expect(states).to.be.an('array');
      for (const state of states) {
        expect(state).to.contain.all.keys(['state', 'config']);
      }
    });
  });

  const mockName = 'John Doe';

  describe('Component', () => {
    describe('Element', () => {
      let scope, element = undefined;
      beforeEach(() => {
        angular.mock.module(name);
        global.inject(($rootScope, $compile) => {
          scope = $rootScope.$new();
          element = angular.element('<admin name="{{mockName}}"></admin>');
          element = $compile(element)(scope);
          scope.mockName = mockName;
          scope.$apply();
        });
      });

      it('should render the text', () => {
        const div = element.find('div');
        expect(div.text()).to.equal(`Hello ${mockName}`);
      });
    });

    describe('Controller', () => {
      let controller, scope = undefined;
      beforeEach(angular.mock.module(name));
      beforeEach(global.inject(($rootScope, $componentController) => {
        scope = $rootScope.$new();
        controller = $componentController('admin', { $scope: scope }, { name: mockName });
      }));

      it('should have bindings bound', () => {
        expect(controller.name).to.exist;
        expect(controller.name).to.equal(mockName);
      });
    });
  });
});
