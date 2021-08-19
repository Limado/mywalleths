import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WalletsModule } from './wallets/wallets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WalletsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_CONECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, process.env.CLIENT_PATH),
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
