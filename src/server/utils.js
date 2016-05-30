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
