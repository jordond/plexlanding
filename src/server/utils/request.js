import http from 'request-promise';

import { ensureJson } from './misc';

function formatData(data) {
  if (!data) {
    return {};
  } else if (data.form) {
    return { form: data.form };
  }
  return { body: data };
}

export class Request {
  request(options) {
    return http(options);
  }

  createRequest(uri, method, data = {}, options = {}) {
    const opts = { uri, method, transform: ensureJson, json: true };
    return this.request(Object.assign(opts, formatData(data), options));
  }

  get(uri, options = {}) {
    return this.createRequest(uri, 'GET', null, options);
  }

  post(uri, data, options = {}) {
    return this.createRequest(uri, 'POST', data, options);
  }

  put(uri, data, options = {}) {
    return this.createRequest(uri, 'PUT', data, options);
  }

  delete(uri, options = {}) {
    return this.createRequest(uri, 'DELETE', null, options);
  }
}

export default new Request();
