'use strict';

/**
 * TODO refactor
 */

let noop = () => { };

export default function cleanUp(callback?: Function) {
  callback = callback || noop;
  process.on('cleanup', callback);

  process.on('exit', (code: number) => {
    process.emit('cleanup', code);
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', () => {
    console.log('Ctrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', (err: any) => {
    console.log('Uncaught Exception...');
    console.log(err.stack);
    process.exit(99);
  });
}