import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(@InjectModel('Messages') private messageModel: Model<Message>){}

  async create(chatGroup: string, senderUser: string, text: string) {
    const newMessage = new this.messageModel({ 
      chatGroup: chatGroup,
      senderUser: senderUser,
      text:text });
    return await newMessage.save();
  }
  identify(senderUser:string, clientId:string){
    
  }
  getClientName(clientId:string){
  }

  findAll() {
    return `This action returns all messages`;
  }

}
