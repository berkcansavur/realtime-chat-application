import { Prop } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Schema as mSchema, Document, Types } from 'mongoose';
export interface ChatGroups{
    id: number;
    chatGroupName: string;
    users: mongoose.Types.ObjectId[];
}
export const ChatGroupsSchema = new mongoose.Schema({
    chatGroupName:{type: String, required: true},
    users:[{
        user:{type:Object}
    }],
},{timestamps:true})
export class ReturnChatGroup{
    @Prop({type: mSchema.Types.ObjectId, auto: true})
    _id:Types.ObjectId;

    @Prop({type:String, required: true})
    chatGroupName:string;

    @Prop({type: [] })
    users:any[];
}
export type ReturnChatGroupDocument = ReturnChatGroup & Document;
