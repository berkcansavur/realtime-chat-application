import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatGroupsController } from './chat-groups.controller';
import { ChatGroupsService } from './chat-groups.service';
import { ChatGroupsSchema } from './chat-groups.model';
import { UsersModule } from '../users/users.module';
import { ChatGroupsRepository } from './chat-groups.repository';
import { ChatGroupsProfile } from '../mapper/chat-groups-mapper';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'ChatGroups', schema:ChatGroupsSchema}]),
    UsersModule
  ],
  controllers: [ChatGroupsController],
  providers:[
    ChatGroupsService, 
    ChatGroupsRepository,
    ChatGroupsProfile
  ],
  exports:[ChatGroupsService]
})
export class ChatGroupsModule {}
