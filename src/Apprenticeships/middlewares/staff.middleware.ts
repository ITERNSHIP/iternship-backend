import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { StaffService } from '../service/staff.service';



@Injectable()
export class StaffMiddleware implements NestMiddleware {
    constructor(
        private  staffService: StaffService,
        ) {}
        
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
          const token = (authHeaders as string).split(' ')[1];
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
          const user = await this.staffService.findOne(decoded.staffId);
    
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