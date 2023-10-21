import { Module } from '@nestjs/common';
import { TuitModule } from './tuit/tuit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
/**
 * TODO INTALAR
 * *PARA PODER CONFIGURAR EL .ENV EN EL PROYECTO 
 * !npm i @nestjs/config 
 * *PARA INTALAR DEPENSENCIAS DE TYPEORM Y POSTGRES
*/
@Module({
  imports: [
    ConfigModule.forRoot(),//TODO PARA PODER USAR LASVARIABLES DEL .ENV DEBO IMPORTAR ESTO
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      autoLoadEntities: true,
      synchronize: true
    }),
    TuitModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
