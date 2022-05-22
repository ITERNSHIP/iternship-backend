import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminEntity } from '../entities/admin.entity';
import { AdminService } from '../service/admin.service';



@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService){}

  @Post('/add')
  create(@Body() admin: AdminEntity): Promise<AdminEntity> {
    return this.adminService.create(admin);
  }

    @Get('/limitaccount/:id')
    async limitAccount(@Param('id') id) {
    return this.adminService.limitAccount(id)

    }

    @Get('/getalladmin')
    async findAll(): Promise<AdminEntity[]> {
      return this.adminService.findAll();
    }

    @Get('/get/:id')
    async findOne(@Param('id') id) {
    return await this.adminService.findOne(id);
  
  }

 
}
