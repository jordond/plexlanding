import hat from 'hat';

import logger from '../logger';
import Config from '../config';
import Client from './plextv';

const log = logger.create('Plex');

const config = {};
let plexClient = {};

export function grabInfoFromPlexTVButImNotYetImplemented() {}

export async function getPlexConfig() {
  const { plex } = await Config.all();

  // Generate a unique ID if one doesn't exist
  if (!plex.identifier) {
    const identifier = hat();
    log.info('Generating a unique identifier');
    plex.identifier = identifier;
    await Config.save({ plex: { identifier } });
  }

  plex.headers['X-Plex-Client-Identifier'] = plex.identifier;
  return plex;
}

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
