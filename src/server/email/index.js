import Config from '../config';
import EmailClient from './client';
import { buildHTMLMessage } from './htmlTokens';
import logger from '../logger';
const log = logger.create('Email');

/**
 * Get all of the application config
 * @returns object  Email specific config, and the email client.
 */
function getClient() {
  return Config.load()
    .then((config) => Object.create({ config: config.email, client: new EmailClient(config.email) }));
}

// TODO Add socket events to email

/**
 * Send an email to all users in the list to inform that a new review,
 * has been posted.
 *
 * @params object doctor  Sequelize table Instance
 * @returns promise<object> Count of failures and successes.
 */
export function sendNewReview(doctor) {
  const addresses = [].concat(doctor.emailList);

  let successCount = 0;
  const onSuccess = (recpient, body) => {
    log.debug(`[${doctor.name}] new review email to [${recpient}]`).silly('Body:', body);
    successCount++;
  };

  let failureCount = 0;
  const onFailure = (err, recpient, index) => {
    log.error(`Unable to send email #${index} to [${recpient}]`);
    failureCount++;
  };

  // Get the email client, and configuration information
  return getClient().then(({ config, client }) => {
    log.debug(`Building message for ${doctor.name}`);

    // If the doctor has the default recpient flag, add default to email list
    if (doctor.emailDefaultUser) {
      addresses.push(config.defaultRecipient);
    }

    // Build the MIME email object
    const html = buildHTMLMessage(doctor, config.html);
    Object.assign(config, { html });
    return client.build(config).then((builtMail) => {
      const sendPromises = [];
      log.verbose(`Sending [${doctor.name}] to [${addresses.length}] addresses`);

      // Iterate over all of the email addresses, adding the address to the email's 'to'
      for (const address of addresses) {
        const mail = Object.assign(builtMail, { to: address });

        // Attempt to send the email, and put the promise into an array
        sendPromises.push(
          client.send(mail)
            .then((body) => onSuccess(address, body))
            .catch((err) => onFailure(err, address, addresses.indexOf(address)))
        );
      }

      // Once all of the email promises have resolved, send the counts.
      return Promise.all(sendPromises).then(() => Object.create({ successCount, failureCount }));
    })
    .catch((err) => {
      log.error('Error sending new review alert', err);
      throw err;
    });
  });
}

/**
 * Send a test email.
 *
 * Builds and sends a test email to ensure all settings are proper.
 * @params string recpient  Email address to send to (optional)
 * @returns promise<object> Returns the mailgun response message object
 */
export function testEmail(recpient) {
  return getClient().then(({ config, client }) => {
    const options = {
      to: recpient || config.defaultRecipient,
      from: `Test message <noreply@${config.domain}>`,
      subject: 'Test email',
      html: '<b>This is test HTML!</b>'
    };
    log.verbose('Sending test message').debug('Options:', options);
    return client.buildAndSend(options);
  });
}

export default { sendNewReview, testEmail, Client: EmailClient };
