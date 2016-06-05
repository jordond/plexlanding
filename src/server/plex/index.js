import { generateRandomHash } from '../utils/misc';
import logger from '../logger';
import Config from '../config';
import Client from './plextv';

const log = logger.create('Plex');

const config = {};
let plexClient = {};

export function grabInfoFromPlexTVButImNotYetImplemented() {}

/**
 * Load all of the configuration information for plex.
 * If a unique identifier does not exist, one will be generated and saved;
 *
 * @return Object Plex configuration
 */
export async function getPlexConfig() {
  const { plex } = await Config.load();

  // Generate a unique ID if one doesn't exist
  if (!plex.identifier) {
    const identifier = await generateRandomHash(16);
    log.info('Generating a unique identifier');
    plex.identifier = identifier;
    await Config.save({ plex: { identifier } });
  }

  plex.headers['X-Plex-Client-Identifier'] = plex.identifier;
  return plex;
}

// TODO Refactor this.
// Maybe persist the plex settings?
export async function init() {
  const plexConfig = await getPlexConfig();

  if (plexConfig.token) {
    grabInfoFromPlexTVButImNotYetImplemented();
  } else {
    log.warn('No plex token exists!')
      .warn('If this is the first run, login to the web UI');
  }

  // Setup the plex.tv client
  plexClient = new Client(plexConfig);

  Object.assign(config, plexConfig);
}

export const client = () => plexClient;

export default { init, Client, client, getPlexConfig };
