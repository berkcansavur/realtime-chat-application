import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './users.model';
import { SessionModule } from 'nestjs-session';
import { SessionOptions } from 'express-session';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports:[
        MongooseModule.forFeature([{ name:'Users',schema: UserSchema}]),
        PassportModule,
        UtilsModule,
        SessionModule.forRootAsync({
            useFactory: () => ({
            session: {
            secret: 'SecretKey',
            resave: false,
            saveUninitialized: false,
            } as SessionOptions,
      }),
    }),
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {

}
