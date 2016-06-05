import SocketIO from 'socket.io';

import logger from './logger';

const io = new SocketIO();
const log = logger.create('Sockets');
const NOOP = () => { };

let socketsConnected = 0;

function onDisconnect(socket) {
  socketsConnected--;
  log.info(`[${socket.id}] has disconnected`)
    .verbose(`There are [${socketsConnected}] sockets remaining`);
}

function onConnect(socket) {
  // TODO Authenticate sockets
  socketsConnected++;
  log.info(`[${socket.id}] Connected`)
    .verbose(`There are [${socketsConnected}] sockets connected`);

  socket.on('disconnect', () => onDisconnect(socket));
}

export function emit(event, data, needsAuthentication) {
  log.verbose(`Emitting ${event}`).silly('Data:', data);
  if (needsAuthentication) {
    // TODO implement
    log.warning('Authentication not yet implemented');
  }
  io.sockets.emit(event, data);
}

export function register(server) {
  log.info('Initializing Socket.IO');

  io.listen(server);
  io.on('connection', onConnect);

  // Add other socket files here
}

export default { register, io, emit };
