import { basename } from "path";

import { create, createExceptionLogger } from "./logger";
import { APIServer } from "./server";

async function init() {
  const log = await create(basename(__filename));
  createExceptionLogger();

  new APIServer()
    .get()
    .start()
    .then((error: Error) => {
      if (Boolean(error)) {
        log.error(`Unable to start the server: ${error.message}`);
        log.error(JSON.stringify(error, null, 2));
      } else {
        log.info(`Server has started`);
      }
    });
}

init();
