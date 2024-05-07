import { FileFieldsInterceptor } from '@nest-lab/fastify-multer';
import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';

interface LocalFilesInterceptorOptions {
  fieldNames: Array<{ name: string; maxCount: number }>;
  fileFilter?: (req, file, callback) => void;
  limits?: {
    fileSize: number;
  };
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor() {
      const multerOptions = {
        fileFilter: options.fileFilter,
        limits: options.limits,
      };

      this.fileInterceptor = new (FileFieldsInterceptor(
        options.fieldNames.map((field) => ({
          name: field.name,
          maxCount: field.maxCount,
        })),
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
