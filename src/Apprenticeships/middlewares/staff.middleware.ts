import { ForbiddenException, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { StaffService } from '../service/staff.service';
import { isJwtExpired } from 'jwt-check-expiration';


@Injectable()
export class StaffMiddleware implements NestMiddleware {
    constructor(
        private  staffService: StaffService,
        ) {}
        
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
          const token = (authHeaders as string).split(' ')[1];
          if(isJwtExpired(token)){
            throw new HttpException('Token is expired', HttpStatus.UNAUTHORIZED)
          }
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
          const user = await this.staffService.findOne(decoded.id);
          if (!user) {
            throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
          }

    
          req.user = user;
          next();
    
        } else {
          throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
        }
      }
}