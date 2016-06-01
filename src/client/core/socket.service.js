import io from 'socket.io-client';

const p = new WeakMap();

export default class SocketService {
  /** @ngInject */
  constructor(socketFactory) {
    p.set(this, { socketFactory });
    this.socket = this.create();
  }

  get() {
    if (!this.socket) {
      this.socket = this.create();
    }
    return this.socket;
  }

  create() {
    const ioSocket = io.connect();
    const factory = p.get(this).socketFactory({ ioSocket });

    factory.on('connect', () => console.log('socket connected'));
    factory.on('disconnect', () => console.warn('socket disconnected'));
    factory.on('reconnect', () => console.log('socket reconnected'));
    factory.on('error', (err) => console.error('socket error', err));

    return factory;
  }
}
