import { MiddlewareConsumer, Module , ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ChatGroupsModule } from './chat-groups/chat-groups.module';
import { AuthModule } from './auth/auth.module';
const cookieSession = require('cookie-session');
import { SessionModule } from 'nestjs-session';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    SessionModule.forRoot({
      session: {
        secret: 'keyboard',
        resave: false,
        saveUninitialized: false
      },
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.duok4hv.mongodb.net/?retryWrites=true&w=majority`),
    UsersModule,
    ChatGroupsModule,
    AuthModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      whitelist:true
    })
  }],
})
export class AppModule {
  
  configure( consumer: MiddlewareConsumer){
    consumer
      .apply(cookieSession({
        keys:[`${process.env.COOKIE_SESSION_KEY}`]
      }))
      .forRoutes('*');
      
    consumer.apply((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', `${process.env.ALLOWED_ORIGIN}`);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    })
    .forRoutes('*');
  }
}
