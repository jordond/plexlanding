import { APIServer } from "./server";

new APIServer()
  .get()
  .start()
  .then((error: Error) => {
    if (Boolean(error)) {
      console.error(`Unable to start the server: ${error.message}`);
      console.error(JSON.stringify(error, null, 2));
    } else {
      console.info(`Server has started`);
    }
  });
