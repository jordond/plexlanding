import http from 'request-promise';

import logger from '../logger';
import { generateUrl } from '../utils/misc';

const PLEX_API_BASE = 'https://plex.tv';
const log = logger.create('PlexTV');

function createPlexUrl(...paths) {
  return generateUrl(PLEX_API_BASE, paths);
}

const apiPaths = {
  login: {
    method: 'GET',
    uri: createPlexUrl('users', 'sign_in.json')
  },
  libraries: {
    method: 'GET',
    uri: (serverId) => createPlexUrl('/api/servers', serverId)
  },
  invite: {
    method: 'POST',
    uri: (serverId) => createPlexUrl('/api/servers', serverId, 'shared_servers')
  }
};

export class PlexTv {
  /**
   * Create the plex.tv api client
   *
   * Config object: {
   *  token: String,
   *  headers: Object {
   *    X-Plex-Platform:          String,
        X-Plex-Platform-Version:  String,
        X-Plex-Client-Identifier: String,
        X-Plex-Product:           String,
        X-Plex-Device-Name:       String
   *  }
   * }
   *
   * @param Object  config  Plex.tv configuration
   */
  constructor({ token, headers = {} }) {
    this.plexToken = token || '';
    this.headers = headers;
  }

  setToken(token = '') {
    this.plexToken = token;
    this.setTokenHeader();
  }

  setTokenHeader(token) {
    this.headers['X-Plex-Token'] = token || this.plexToken;
  }

  getRequestOptions(path = {}, extra = {}) {
    return Object.assign(path, extra, { headers: this.headers });
  }

  async authenticate(login, password) {
    // Clear out existing token
    this.setTokenHeader(this.token = '');

    const options = this.getRequestOptions(apiPaths.login, { json: true });

    try {
      const response = await http(options);
      log.info('response', response);
    } catch (err) {
      log.error('Failed to authenticate with Plex.tv', err);
      throw err;
    }
  }
}

export default PlexTv;
