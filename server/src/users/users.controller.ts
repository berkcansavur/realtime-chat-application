import {
    Body, 
    Controller, 
    Post, 
    Session, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UtilsService } from '../utils/utils.service';
import { 
    ReturnUserDTO,
    CreateUserDTO } from './dtos/user-dtos';
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private utilsService:UtilsService ){}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDTO ) : Promise<ReturnUserDTO>{
        try {
            const hashedPassword = await this.utilsService.hashPassword(body.password);
            body.password = hashedPassword;
            return await this.userService.createUser({createUserDTO:body});
        } catch (error) {
            throw new Error(error);
        }
    }
    @Post('/logout')
    async logoutUser(@Session() session: any){
        session.userId = null;
        session.CurrentUser = null;
    }
}
