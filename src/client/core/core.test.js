import { expect } from 'chai';

import { module as core, default as name } from './core.module';
import config from './core.config';

describe('Module: Core', () => {
  describe('Module', () => {
    it('should be an Angular object', () => {
      const props = ['name', 'factory', 'service', 'controller', 'directive', 'component', 'config'];
      expect(core).to.be.an('object');
      expect(core).to.contain.all.keys(props);
    });

    it('should have dependencies that are strings', () => {
      expect(core.requires).to.be.an('array').length.above(0);

      for (const dependency of core.requires) {
        expect(dependency).to.be.a('string');
      }
    });

    it('default export should be a string called app.core', () => {
      expect(name).to.be.a('string').and.equal('app.core');
    });
  });

  describe('Config', () => {
    it('should be a function', () => {
      expect(config).to.be.a('function');
    });
  });
});
