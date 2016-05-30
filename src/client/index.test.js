import { expect } from 'chai';

import app from './index';

describe('Module: Index', () => {
  it('should be an Angular object', () => {
    const props = ['name', 'factory', 'service', 'controller', 'directive', 'component', 'config'];
    expect(app).to.be.an('object');
    expect(app).to.contain.all.keys(props);
  });

  it('should be called app', () => {
    expect(app.name).to.equal('app');
  });
});
