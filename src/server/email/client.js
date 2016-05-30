/**
 * TODO - switch from using mailgun to node-mailer + user supplied email&password
 */

import Mailgun from 'mailgun-js';
import mailComposer from 'mailcomposer';

import logger from '../logger';
const log = logger.create('Email:Client');

function validationError(message, data) {
  log.error(`Validation: [${message}]`, data);
  return { message, reason: 'validation', data };
}

export class EmailClient {
  constructor({ apiKey, domain, from }) {
    this.mailgun = new Mailgun({ apiKey, domain });
    this.credentials = { apiKey, domain };
    this.from = from;
  }

  buildAndSend(options) {
    return this.build(options, true);
  }

  /**
   * Build a message object
   *
   * options: {
   *  from:     string (optional, will be pulled from config)
   *  to:       string
   *  subject:  string
   *  html:     string
   * }
   * Either body or html is required
   *
   * @param object  options           Message contents
   * @param boolean sendImmediately   Send the built mail right away (requires options.to)
   */
  build(options, sendImmediately = false) {
    return new Promise((resolve, reject) => {
      if (!options.from) {
        options.from = this.from;
      }

      return mailComposer(options).build((err, message) => {
        if (err) {
          throw err;
        }
        const builtMail = { to: options.to, message, built: true };
        if (sendImmediately) {
          if (!builtMail.to) {
            throw validationError('No recipient was provided', { to: options.to });
          }
          return this.send(builtMail)
            .then((body) => resolve(body))
            .catch((error) => reject(error));
        }
        return resolve(builtMail);
      });
    });
  }

  /**
   * Send an email
   * Can be called by using {@link build} or passing a custom object.
   *
   * custom = {
   *  from:     string (optional, will be pulled from config)
   *  to:       string
   *  subject:  string
   *  html:     string
   * }
   *
   * @param object mail Either built mail or custom object
   */
  send(mail = false) {
    return new Promise((resolve, reject) => {
      // Validate mail object
      if (!mail) {
        throw validationError('Mail object was not defined');
      } else if (!mail.to) {
        throw validationError('No recipient was provided', { to: mail.to });
      }

      if (!this.credentials.apiKey) {
        throw validationError('No api key was specified');
      } else if (!this.credentials.domain) {
        throw validationError('No domain was specified');
      }

      // Validate built or custom mail object
      if (!mail.built) {
        if (!mail.subject) {
          throw validationError('No subject was provided');
        } else if (!mail.html) {
          throw validationError('No message was provided');
        }
      }

      const callback = (err, body) => {
        if (err) {
          log.error('Mailgun error', err);
          return reject(err);
        }
        log.debug('Message was sent');
        return resolve(body);
      };

      // Send the email
      if (mail.built) {
        const mimeMail = Object.assign(mail, { message: mail.message.toString('ascii') });
        this.mailgun.messages().sendMime(mimeMail, callback);
      } else {
        this.mailgun.messages().send(mail, callback);
      }
    });
  }
}

export default EmailClient;
