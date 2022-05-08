import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from '../service/admin.service';



@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService){}

//   @Post('/add')
//   create(@Body() user: UserEntity): Promise<UserEntity> {
//     return this.adminService.create(user);
//   }

    @Get('/getcomById/:id')
    async findOne(@Param('id') id) {
    return this.adminService.findOne(id)

    }

 
}
