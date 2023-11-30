import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //importamos validation Pipe para utilizar VALIDACIONES

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuramos para VALIDAR DATOS DE ENTRADA GLOBALMENTE
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo datos que esten en la lista blanca o DTO, si datos que no corresponden tira error
      forbidNonWhitelisted: true, //manda un arror al cliente si envia otra cosa del DTO o lista balanca
      transform: true //para que transforme los datos de entrada en el controller cuando lo tenga especificada en la funcion, siempre cuando pueda
    }),
  );

  await app.listen(3000);
}
bootstrap();
