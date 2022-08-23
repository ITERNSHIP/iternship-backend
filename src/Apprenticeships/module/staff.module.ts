import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
import { StaffController } from '../controller/staff.controller';
import { StaffService } from '../service/staff.service';
import { RegisterEntity } from '../entities/regis.entity';



@Module({
  controllers: [StaffController],
  providers: [StaffService,JwtService],
  imports:[TypeOrmModule.forFeature([StaffEntity,RegisterEntity])],
  exports:[StaffService]
})
export class StaffModule   {

}