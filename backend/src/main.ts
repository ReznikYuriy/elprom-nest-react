import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configs from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bodyParser: false,
    cors: false,
  });

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    //.addBearerAuth()
    .setTitle('El-prom api')
    .setDescription('')
    .setVersion('2.0')
    .addTag('El-prom')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configs.port);
}
bootstrap();
