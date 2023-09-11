import { Injectable, Logger } from "@nestjs/common";
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ReturnUser, ReturnUserProfile, UserToBeValidate } from "src/users/users.model";
import { 
    UserToBeValidateDTO,
    UserProfileInfoDTO,
    ReturnUserDTO,
    FriendInfoDTO
 } from "src/users/dtos/user-dtos";
@Injectable()
export class UserProfile extends AutomapperProfile{
    constructor(@InjectMapper() protected readonly mapper: Mapper){
        super(mapper);
    }
    get profile(): MappingProfile {
        return(mapper: Mapper)=>{
            createMap<ReturnUser, ReturnUserDTO>(
                mapper,
                ReturnUser,
                ReturnUserDTO,
            )
            createMap<UserToBeValidate, UserToBeValidateDTO>(
                mapper,
                UserToBeValidate,
                UserToBeValidateDTO,
                forMember(
                    (destination)=> destination._id,
                    mapFrom((source)=> source._id)
                ),
                forMember(
                    (destination)=> destination.email,
                    mapFrom((source)=> source.email)
                ),
                forMember(
                    (destination)=> destination.password,
                    mapFrom((source)=> source.password)
                )
            ),
            createMap<UserProfileInfoDTO, ReturnUserProfile>(
                mapper,
                UserProfileInfoDTO,
                ReturnUserProfile,
                forMember(
                    (destination)=>destination._id,
                    mapFrom((source)=>source.UserId)
                ),
                forMember(
                    (destination)=>destination.name,
                    mapFrom((source)=>source.UserName)
                ),
                forMember(
                    (destination)=>destination.email,
                    mapFrom((source)=>source.UserEmail)
                ),
                forMember(
                    (destination)=>destination.ChatGroups,
                    mapFrom((source)=>source.ChatGroups)
                ),
                forMember(
                    (destination)=>destination.Friends,
                    mapFrom((source)=>source.Friends)
                )
            )
            createMap<ReturnUser, UserProfileInfoDTO>(
                mapper,
                ReturnUser,
                UserProfileInfoDTO,
                forMember(
                    (destination)=> destination.UserId,
                    mapFrom((source)=> source._id)
                ),
                forMember(
                    (destination)=> destination.UserName,
                    mapFrom((source)=> source.name)
                ),
                forMember(
                    (destination)=> destination.UserEmail,
                    mapFrom((source)=> source.email)
                ),
                forMember(
                    (destination)=> destination.ChatGroups,
                    mapFrom((source)=> source.ChatGroups)
                ),
                forMember(
                    (destination)=> destination.Friends,
                    mapFrom((source)=> source.Friends)
                )
            )
            createMap<ReturnUser, FriendInfoDTO>(
                mapper,
                ReturnUser,
                FriendInfoDTO,
                forMember(
                    (destination)=> destination._id,
                    mapFrom((source)=> source._id)
                ),
                forMember(
                    (destination)=> destination.name,
                    mapFrom((source)=> source.name)
                ),
                forMember(
                    (destination)=> destination.email,
                    mapFrom((source)=> source.email)
                )
            )
        }
    }
}