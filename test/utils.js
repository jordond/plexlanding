/**
 * Utility functions to be used during tests
 */
import { expect } from 'chai';

const angularObjectProperties = ['name', 'factory', 'service', 'controller', 'directive', 'component', 'config'];

export function isAnAngularObject(moduleToTest) {
  it('should be an Angular object', () => {
    expect(moduleToTest).to.be.an('object');
    expect(moduleToTest).to.contain.all.keys(angularObjectProperties);
  });
}

export function isAnAngularObjectWithDependencies(moduleToTest, dependencyLength = 0) {
  isAnAngularObject(moduleToTest);

  expect(moduleToTest.requires).to.be.an('array');
  expect(moduleToTest.requires).length.to.be.above(dependencyLength);
  for (const dependency of moduleToTest.requires) {
    expect(dependency).to.be.a('string');
  }
}

const utils = {
  isAnAngularObject,
  isAnAngularObjectWithDependencies
};

export default utils;
