import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { response } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),

        ]);
        if (!requiredRoles) {
            return true;
        }
        // to token from body
        let { body } = context.switchToHttp().getRequest();
        // to token from headers
        let { headers } = context.switchToHttp().getRequest()
        if (body?.Headers != undefined || headers?.authorization != undefined) {
            if (body?.Headers != undefined) {
                const token = body.Headers.Authorization;

                const payload = this.jwtService.decode(token);

                body = payload;

            }

            if (headers?.authorization != undefined) {
                const token = headers.authorization;
                const payload = this.jwtService.decode(token);
                body = payload;

            }
        }
        else {
            // response.status(401).send("המשתמש לא נכנס נכון");
        }
        // check the type
        const ans = requiredRoles.some((role) => body.type?.includes(role));
        if (ans)
            return ans;
        throw new UnauthorizedException("אין הרשאה למשתמש זה לגשת למשאב הספציפי");

    }

}


