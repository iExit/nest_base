import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

const port = 3000;
const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 配置Swagger
   */
  const options = new DocumentBuilder()
    .setTitle('nest基础框架')
    .setDescription('nest基础框架Api文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);

  /**
   * 使用log4js日志框架
   */
  app.useLogger(app.get(Log4jsLogger));

  await app.listen(port);
}
bootstrap().then(() => {
  logger.log(`listen in http://localhost:${port}/swagger-ui`);
});
