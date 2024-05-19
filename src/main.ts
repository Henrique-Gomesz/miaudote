import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  // APP SETUP
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    cors: true,
  });

  // SWAGGER SETUP
  const config = new DocumentBuilder()
    .setTitle('Miaudote')
    .setDescription('The Miaudote API description')
    .setVersion('1.0')
    .addTag('miaudote')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // VALIDATION SETUP
  app.useGlobalPipes(new ValidationPipe());

  // EXPOSE APPLICATION
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
