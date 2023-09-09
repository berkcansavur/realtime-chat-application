import { 
    Body,
    Controller,
    Post,
    Get,
    Param,
    Session, 
    UnauthorizedException
} from '@nestjs/common';
import { ChatGroupsService } from './chat-groups.service';
import { UsersService } from 'src/users/users.service';
import { CreateChatGroupDTO } from './dtos/create-chat-group.dto';
import mongoose from 'mongoose';

@Controller('chat-groups')
export class ChatGroupsController {
    constructor(
        private chatGroupsService: ChatGroupsService,
        private usersService: UsersService){}
    
    @Post('/create-chat-group')
    async createChatGroup(@Body() body: CreateChatGroupDTO, @Session() session: any){
        if (!session.CurrentUser._id) {
            throw new UnauthorizedException('You need to login to create a chat group');
        }
        const newChatGroup = await this.chatGroupsService.createChatGroup({createChatGroupDTO:body});
        await this.chatGroupsService.addUserToChatGroup({chatGroupId:newChatGroup._id,userId:session.CurrentUser._id})
        return newChatGroup;
    }
    @Get('/get-users/:id')
    async getChatGroupUsers(@Param('id') id: mongoose.Types.ObjectId){
        const users = await this.chatGroupsService.getChatGroupsUsers({chatGroupId :id});
        return users;
    }
    // @Post('/add-user')
    // async addUserToChatGroup(@Body() body:{ chatGroupId: mongoose.Types.ObjectId }, @Session() session:any){
    //     try {
            
    //         const user = await this.usersService.findUser(session.CurrentUser._id);
    //         return await this.chatGroupsService.addUserToChatGroup({chatGroupId :body.chatGroupId,userId :user});
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    @Post('/remove-user/:id')
    async removeUserFromChatGroup(@Param('id') chatGroupId: mongoose.Types.ObjectId, @Body() body:{ userId: mongoose.Types.ObjectId }){
        try {
            const updatedChatGroup = await this.chatGroupsService.removeUserFromChatGroup({chatGroupId:chatGroupId,userId:body.userId});
            return updatedChatGroup;
        } catch (error) {
            throw new Error(error);
        }
    }
    @Post('/change-group-name/:id')
    async updateGroupName(@Param('id') chatGroupId: mongoose.Types.ObjectId, @Body() body:{ newName: string}){
        try {
            const updatedChatGroup = await this.chatGroupsService.updateChatGroupName({chatGroupId :chatGroupId,chatGroupName :body.newName});
            return updatedChatGroup;
        } catch (error) {
            throw new Error(error);
        }
    }
}

