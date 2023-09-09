import mongoose from "mongoose";

export class UserDataDTO {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    ChatGroups: mongoose.Types.ObjectId[];
}