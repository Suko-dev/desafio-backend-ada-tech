import { config } from '../../config/environment-variables';
import { Environment } from '../../config/environment';

export default class Logger {
  static log(...messages: string[] | Record<never, unknown>[]) {
    if (config.ENVIRONMENT !== Environment.TEST) {
      console.log(...messages);
    }
  }

  static info(...messages: string[] | Record<never, unknown>[]) {
    console.log(...messages);
  }

  static error(...messages: string[] | Record<never, unknown>[]) {
    console.error(...messages);
  }

  static debug(...messages: string[] | Record<never, unknown>[]) {
    if (config.ENVIRONMENT === Environment.DEVELOPMENT) {
      console.log(...messages);
    }
  }
}
