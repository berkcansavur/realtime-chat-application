import mongoose from "mongoose"

import { ChatGroupInfoDTO } from "src/chat-groups/dtos/chat-group-info.dto";
import { CreateChatGroupDTO } from "src/chat-groups/dtos/create-chat-group.dto";
import { ReturnChatGroupDTO } from "src/chat-groups/dtos/return-chat-groups.dto";

export interface IChatGroupService {
    createChatGroup({createChatGroupDTO}:{createChatGroupDTO: CreateChatGroupDTO, }): Promise<ReturnChatGroupDTO>;
    deleteChatGroup({chatGroupId} : {chatGroupId:mongoose.Types.ObjectId}) : Promise<any>;
    getChatGroup({id} : {id:mongoose.Types.ObjectId}): Promise<ChatGroupInfoDTO>;
    getChatGroupDetails({chatGroups} : {chatGroups:mongoose.Types.ObjectId[]}): Promise<ChatGroupInfoDTO[]>;
    getChatGroupByStringId({id}:{id: string}): Promise<ChatGroupInfoDTO>;
    getChatGroupsUsers({chatGroupId} : {chatGroupId:mongoose.Types.ObjectId}): Promise<mongoose.Types.ObjectId[]>;
    addUserToChatGroup({chatGroupId, userId } : {chatGroupId:mongoose.Types.ObjectId, userId:mongoose.Types.ObjectId}): Promise<ChatGroupInfoDTO>;
    removeUserFromChatGroup({chatGroupId,userId } : {chatGroupId:mongoose.Types.ObjectId, userId:mongoose.Types.ObjectId}): Promise<ChatGroupInfoDTO>;
    updateChatGroupName({chatGroupId, chatGroupName}:{chatGroupId: mongoose.Types.ObjectId, chatGroupName: string}): Promise<ChatGroupInfoDTO>;
    
}
export interface UserInterfaceForMessaging {
    UserID:string; 
    name: string;
    email: string;
    password: string;
    Friends: object[];
    ChatGroups: object[];
    socketId: string;
  }