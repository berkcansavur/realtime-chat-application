import { Logger } from "@nestjs/common";
import { INotificationState } from "../interfaces/notification-state.interface";
import { NotificationsRepository } from '../notifications.repository';
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationCouldNotCreatedException } from "../exceptions";

export class NotificaitonViewedState implements INotificationState {
    private readonly logger = new Logger(NotificaitonViewedState.name);
    constructor(
        private readonly notificationsRepository: NotificationsRepository,
        @InjectMapper() private readonly ReturnMapper : Mapper,
    ){}
    create({
        createNotificationDto
    }:{
        createNotificationDto:CreateNotificationDto
    }): Promise<Notification>{
        throw new NotificationCouldNotCreatedException(createNotificationDto);
    }
}