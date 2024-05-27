import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/domain/service/auth-service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {

    public constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1]

        if(token){
            const isTokenValid = await this.authService.validateToken(token)
            if(isTokenValid)
                return next();
        }
        
        return res.status(HttpStatus.UNAUTHORIZED).send()
    }
}
