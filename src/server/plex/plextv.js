import hat from 'hat';

import http from '../utils/request';
import logger from '../logger';
import Config from '../config';
import { generateUrl } from '../utils/misc';

const PLEX_API_BASE = 'https://plex.tv';
const log = logger.create('PlexTV');

function createPlexUrl(...paths) {
  return generateUrl(PLEX_API_BASE, ...paths);
}

const apiPaths = {
  login: createPlexUrl('users', 'sign_in.json'),
  libraries: (serverId) => createPlexUrl('/api/servers', serverId),
  invite: (serverId) => createPlexUrl('/api/servers', serverId, 'shared_servers')
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
  constructor({ token = '', headers = {} } = {}) {
    this.headers = headers;
    this.setToken(token);
  }

  setToken(token = '') {
    this.plexToken = token;
    this.setTokenHeader();
  }

  setTokenHeader(token) {
    this.headers['X-Plex-Token'] = token || this.plexToken;
  }

  hasMinimumHeaderRequirements() {
    return this.headers['X-Plex-Product']
      && this.headers['X-Plex-Version']
      && this.headers['X-Plex-Client-Identifier'];
  }

  async buildRequestOptions(extra = {}) {
    if (!this.hasMinimumHeaderRequirements()) {
      const { plex: { headers } } = await Config.all();
      if (!headers['X-Plex-Client-Identifier']) {
        headers['X-Plex-Client-Identifier'] = hat();
      }
      this.headers = headers;
      this.setTokenHeader();
    }
    return Object.assign({ headers: this.headers }, extra);
  }

  async authenticate(login, password) {
    // Clear out existing token
    this.setToken();

    log.info(`Attempting to authenticate [${login}] with Plex.tv`);
    const requestData = {
      form: {
        'user[login]': login,
        'user[password]': password
      }
    };

    try {
      const options = await this.buildRequestOptions();
      const response = await http.post(apiPaths.login, requestData, options);

      log.info('Successfully authenticated with Plex.TV');
      return response.user;
    } catch (err) {
      log.error('Failed to authenticate with Plex.tv', err.response);
      throw err;
    }
  }
}

export default PlexTv;
