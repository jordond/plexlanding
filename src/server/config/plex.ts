/**
 * Plex specific configuration, for now this file must be manually edited.
 * The hope is to be able to edit this via the admin section.
 *
 * Use your config.json instead of overriding these values
 */
'use strict';

interface IPlexConfig {
  hostname: string;
  token: string;
  port?: number;
  https?: boolean;
  username?: string;
  password?: string;
  options: IPlexOptions;
}

interface IPlexOptions {
  identifier: string;
  product?: string;
  version?: number;
  deviceName?: string;
  platform?: string;
}

export default {
  plex: <IPlexConfig>{
    hostname: 'localhost',
    port: 32400,
    token: '',
    options: {
      identifier: 'c297feb2-ce93-11e5-ab30-625662870761'
    }
  }
}
