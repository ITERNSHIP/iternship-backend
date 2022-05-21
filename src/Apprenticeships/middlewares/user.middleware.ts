import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private  userService: UserService,
        ) {}
        
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
          const token = (authHeaders as string).split(' ')[1];
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
          const user = await this.userService.findOne(decoded.userId);
    
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