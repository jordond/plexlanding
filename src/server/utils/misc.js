import { resolve } from 'path';

import { promisify } from 'bluebird';
import urljoin from 'url-join';
import xml2js from 'xml2js';

import logger from '../logger';

const parseXml = promisify(xml2js.parseString);

export function safelyParseJSON(json) {
  if (!json) {
    return '';
  }
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log('Could not parse JSON', json, err);
  }
}

export function createHttpError(message, data) {
  return {
    status: 'error',
    error: data,
    message
  };
}

export function ensureHttpProtocol(url) {
  if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
    url = `https://${url}`;
  }
  return url;
}

export function generateUrl(base, ...paths) {
  let path = '';
  for (const p of paths) {
    path = urljoin(path, p);
  }
  return urljoin(base, path);
}

/**
 * Ensure that data passed in can be parsed as a json object.
 * Used mainly for http requests as response may be xml or json
 *
 * @accepts Object|String data  Data to be parsed
 * @return Object If successful returns parsed object
 */
export async function ensureJson(data = '') {
  const log = logger.create('Misc:Json');
  // Check if it is already valid json
  if (typeof data === 'object') {
    log.debug('Data is already json');
    return data;
  }

  // Check if it is a json string
  try {
    const json = JSON.parse(data);
    log.debug('Data was parsed as json');
    return json;
  } catch (err) {
    log.debug('Data is not a JSON string');
  }

  try {
    const json = await parseXml(data);
    return json;
  } catch (err) {
    log.debug('Data is not XML');
    throw new Error('Could not parse data as json object', data);
  }
}
