'use strict';

import * as SocketIO from 'socket.io';

import { create } from '../../utils/logger/index';
import { database } from './database';
import { ExecutionTimer } from '../../utils/execution';

let _models: string[] = [];

export let addModelSocket = (modelName: string) => {
  _models.push(modelName);
};

export default class Sockets implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;
  private _socketsConnected: number;
  private _events: any;

  constructor(config: Config.IConfig) {
    this._config = config;
  }

  /**
   * Initialize the socket configuration for server
   * @params {Object} app Express Application object
   * @returns {Promise} Pending completion.
   */
  init(app: any) {
    if (!app) {
      this._log.error('[init] App is not defined');
      throw 'App is not defined';
    }

    let timer = new ExecutionTimer();
    this._log = create('Sockets');
    this._log.info('Initializing Socket.IO');

    let io = SocketIO.listen(app, this._config.socket);
    io.on('connection', (socket) => this.onConnect(socket));
    this._events = database().events;

    this._log
      .verbose('Initial Socket setup finished')
      .debug('Sockets instantiation took ' + timer.toString());

    return Promise.resolve(app);
  }

  /**
   * Getter number of sockets connected
   * @returns {number} The amount of connected sockets
   */
  get connected() {
    return this._socketsConnected;
  }

  /**
   * Handler for when a socket is connected.  It will register any model sockets
   * or addtional sockets
   * @param {Object}  socket  Socket.IO socket object
   */
  onConnect(socket: SocketIO.Socket) {
    let address = socket.handshake.address !== null ? socket.handshake.address : process.env.DOMAIN;
    this._socketsConnected++;

    this._log
      .info('[' + address + '][' + socket.id + '] Connected')
      .verbose('There are now [' + this._socketsConnected + '] sockets connected');

    socket.on('disconnect', (socket: SocketIO.Socket) => this.onDisconnect(socket, address));
    this.registerDatabaseSockets(socket);

    // Register More sockets here
  }

  /**
   * Handler for when a socket disconnects, mostly for logging purposes
   * @param {Object}  socket  Socket.IO socket object
   */
  onDisconnect(socket: SocketIO.Socket, address: string) {
    this._socketsConnected--;
    this._log
      .info('[' + address + '][' + socket.id + '] has disconnected')
      .verbose('There are [' + this._socketsConnected + '] sockets remaining');
  }

  /**
   * For each connecting socket register the database model events
   * @param {SocketIO.Socket} socket  Connecting socket
   */
  registerDatabaseSockets(socket: SocketIO.Socket) {
    this._log.verbose('Registering [' + _models.length + '] model sockets');
    for (let model of _models) {
      let onSave = (document: any[] | {}) => {
        socket.emit(model + ':save', document);
      };

      let onDelete = (document: any[] | {}) => {
        socket.emit(model + ':delete', document);
      };

      this._events.on('bulkSave', onSave);
      this._events.on('save', onSave);
      this._events.on('bulkDelete', onDelete);
      this._events.on('delete', onDelete);

      socket.on('disconnect', () => {
        this._events.removeListener('save', onSave);
        this._events.removeListener('delete', onDelete);
      });
    }
  }
}
