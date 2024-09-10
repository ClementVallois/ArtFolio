import { Logger } from 'src/infrastructure/logger/services/logger.service';
import { LogLevel } from 'src/infrastructure/logger/log-level.enum';

export function LogMethod(level: LogLevel = LogLevel.INFO) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = `${className}.${propertyKey}`;

      const logger: Logger = this.logger;

      if (logger && typeof logger.log === 'function') {
        logger.log(`Executing ${methodName}`, level);
      }

      try {
        const result = await originalMethod.apply(this, args);
        if (logger && typeof logger.log === 'function') {
          logger.log(`Completed ${methodName}`, level);
        }
        return result;
      } catch (error) {
        if (logger && typeof logger.error === 'function') {
          logger.error(`Error in ${methodName}`, error);
        }
        throw error;
      }
    };

    return descriptor;
  };
}
