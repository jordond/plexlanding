/**
 * Manadatory settings in order for gulp deploy to work
 * Passwordless SSH key authentication is required!
 */

module.exports = {

  /**
   * Root directory of all source files
   *  - './src/'
   * type: string
   */
  source: '',

  /**
   * Hostname of the ssh server
   * type: string
   */
  hostname: '',

  /**
   * Username of the for ssh server
   * type: string
   */
  username: '',

  /**
   * Destination folder on server where files will be stored
   * type: string
   *  - '/opt/app'
   */
  destination: '',

  /**
   * Port the SSH server is running on
   * type: number
   * default: 22
   */
  port: 22,

  /**
   * Delete files on server if they don't exist locally
   * Also enables gulp-rsync({ recursive })
   * type: boolean
   * default: true
   */
  clean: true,

  /**
   * Extra files to include in the deploy, accecepts vinlyfs globs
   * ex 'app/*.spec.js'
   * type: array
   */
  include: [
    './package.json',
    './config.json.example'
  ],

  /**
   * List of files to exclude from the deploy
   * type: array
   * default: []
   */
  exclude: [
    './config.json'
  ]

};