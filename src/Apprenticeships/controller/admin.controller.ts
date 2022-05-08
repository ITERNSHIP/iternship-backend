import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserEntity } from '../entities/user.entity';
import { AdminService } from '../service/admin.service';



@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService){}

//   @Post('/add')
//   create(@Body() user: UserEntity): Promise<UserEntity> {
//     return this.adminService.create(user);
//   }

 
}
