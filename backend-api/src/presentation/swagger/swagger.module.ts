import {
  Module,
  DynamicModule,
  Provider,
  INestApplication,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface ISwaggerConfig {
  setup(app: INestApplication): void;
}

@Module({})
export class SwaggerConfigModule {
  static forRoot(): DynamicModule {
    const swaggerConfigProvider: Provider = {
      provide: 'SWAGGER_CONFIG',
      useFactory: (): ISwaggerConfig => ({
        setup: (app: INestApplication) => {
          const config = new DocumentBuilder()
            .setTitle('ArtFolio API')
            .setDescription('The ArtFolio API documentation')
            .setVersion('1.0')
            .build();
          const document = SwaggerModule.createDocument(app, config);
          SwaggerModule.setup('api', app, document);
        },
      }),
    };

    return {
      module: SwaggerConfigModule,
      providers: [swaggerConfigProvider],
      exports: ['SWAGGER_CONFIG'],
    };
  }
}
