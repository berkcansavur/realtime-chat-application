import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = ( await super.canActivate(context) ) as boolean ;
        if (!result) {
            throw new UnauthorizedException('Unauthorized');
          }
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}