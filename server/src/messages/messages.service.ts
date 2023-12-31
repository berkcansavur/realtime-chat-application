import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessagesRepository } from './messages.repository';
import { IMessagesService } from 'interfaces/messages-service.interface';
import { MessageDTO } from './dto/message.dto';
import { MessageCouldNotCreatedException } from './exceptions';
@Injectable()
export class MessagesService implements IMessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    private messagesRepository: MessagesRepository){}

    private readonly connectedClients: Map<string, Socket> = new Map();

  async create({
    messageDto
  }: {
    messageDto:MessageDTO
  }) {
    const { logger } = this;
    logger.debug(`[MessagesService] create: ${JSON.stringify(messageDto)}`);

    const message =  await this.messagesRepository.create(messageDto);
    if(!message){
      throw new MessageCouldNotCreatedException({messageDto});
    }
    return message;
    
  }

  async getLast20Messages({
    chatGroupID
  }:{
    chatGroupID:string
  }) {
    const { logger } = this;
    logger.debug(`[MessagesService] getLast20Messages: ${JSON.stringify(chatGroupID)}`);
    return await this.messagesRepository.getLastMessages(chatGroupID, 20);
  }

}
