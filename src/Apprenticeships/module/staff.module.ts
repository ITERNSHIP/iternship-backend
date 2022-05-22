import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { AdminMiddleware } from '../middlewares/admin.middleware';
import { JwtService } from '@nestjs/jwt';
import { StaffController } from '../controller/staff.controller';
import { StaffService } from '../service/staff.service';



@Module({
  controllers: [StaffController],
  providers: [StaffService,JwtService],
  imports:[TypeOrmModule.forFeature([StaffEntity])],
  exports:[StaffService]
})
export class StaffModule   {

}