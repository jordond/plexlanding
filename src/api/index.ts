import * as Server from "./server";

Server.create()
  .start()
  .then((error: Error) => {
    if (Boolean(error)) {
      console.error(`Unable to start the server: ${error.message}`);
      console.error(JSON.stringify(error, null, 2));
    } else {
      console.info(`Server has started`);
    }
  });
