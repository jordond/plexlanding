import hat from 'hat';

import logger from '../logger';
import Config from '../config';
import PlexTV from './plextv';

const log = logger.create('Plex');

const config = {};
let client = {};

export function grabInfoFromPlexTVButImNotYetImplemented() {}

export async function init() {
  const { plex } = await Config.all();

  // Generate a unique ID if one doesn't exist
  if (!plex.headers['X-Plex-Client-Identifier']) {
    log.info('Generating a unique identifier');
    plex.headers['X-Plex-Client-Identifier'] = hat();
    await Config.save({ plex });
  }

  if (plex.token) {
    grabInfoFromPlexTVButImNotYetImplemented();
  } else {
    log.warn('No plex token exists!')
      .warn('If this is the first run, login to the web UI');
  }

  // Setup the plex.tv client
  client = new PlexTV(plex);

  Object.assign(config, plex);
}

export const Client = () => client;

export default { init, Client };
