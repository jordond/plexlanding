import http from '../utils/request';
import logger from '../logger';
import { getPlexConfig } from '../plex';
import { generateUrl } from '../utils/misc';

const PLEX_API_BASE = 'https://plex.tv';
const log = logger.create('PlexTV');

function createPlexUrl(...paths) {
  return generateUrl(PLEX_API_BASE, ...paths);
}

/**
 * Available Plex.tv api endpoints
 */
const apiPaths = {
  login: createPlexUrl('users', 'sign_in.json'),
  libraries: (serverId) => createPlexUrl('/api/servers', serverId),
  invite: (serverId) => createPlexUrl('/api/servers', serverId, 'shared_servers')
};

/**
 * Create the plex.tv api client
 *
 * Config object: {
 *  token: String,
 *  headers: Object
 * }
 *
 * @param Object  config  Plex.tv configuration
 */
export class PlexTv {
  constructor({ token = '', headers = {} } = {}) {
    this.headers = headers;
    this.setToken(token);
  }

  /**
   * Store the access token as a member, and set the
   * X-Plex-Acess-Token.
   *
   * @param String  token Plex access token
   */
  setToken(token = '') {
    this.plexToken = token;
    this.setTokenHeader();
  }

  /**
   * Clear the access token from the client and headers by passing
   * nothing to the setToken method.
   */
  clearToken() {
    this.setToken();
  }

  /**
   * Set the X-Plex-Token header
   *
   * @param String  token Plex access token
   */
  setTokenHeader(token) {
    this.headers['X-Plex-Token'] = token || this.plexToken;
  }

  /**
   * Make sure the headers object contains the required headers for a
   * successful request to Plex.tv
   *
   * @return Boolean  Whether or not all of the headers are set
   */
  hasMinimumHeaderRequirements() {
    return this.headers['X-Plex-Product']
      && this.headers['X-Plex-Version']
      && this.headers['X-Plex-Client-Identifier'];
  }

  /**
   * @async
   * Build the request options for 'request-promise' mainly the headers.
   * If the minimum header requirement is false, then gather the infomation
   * from the Plex module.
   *
   * @see https://github.com/request/request-promise for options
   *
   * @param Object  extra Extra configuration options for the request
   * @return Object Merged request configuration object
   */
  async buildRequestOptions(extra = {}) {
    if (!this.hasMinimumHeaderRequirements()) {
      const { headers } = await getPlexConfig();
      this.headers = headers;
      this.setTokenHeader();
    }
    return Object.assign({ headers: this.headers }, extra);
  }

  /**
   * @async
   * Authenticate with Plex.tv.
   * Using the supplied credientials, attempt to login to Plex.tv.
   * On success return the user object, so that the information can be parsed.
   *
   * @param String  login Plex.tv login, either email or username
   * @param String  password  Password for Plex.tv
   * @return Object User object containing user information as well as auth token
   */
  async authenticate(login, password) {
    log.info(`Attempting to authenticate [${login}] with Plex.tv`);
    this.clearToken();

    const form = { 'user[login]': login, 'user[password]': password };
    try {
      const options = await this.buildRequestOptions();
      const response = await http.post(apiPaths.login, { form }, options);

      log.info('Successfully authenticated with Plex.TV');
      return response.user;
    } catch (err) {
      log.error('Failed to authenticate with Plex.tv', err.response);
      throw err;
    }
  }
}

export default PlexTv;
