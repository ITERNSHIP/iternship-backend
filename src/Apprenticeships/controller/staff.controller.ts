import { Body, Controller, Delete, Get, Param, Post, Put,Response } from '@nestjs/common';
import { StaffEntity } from '../entities/staff.entity';
import { StaffService } from '../service/staff.service';



@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService){}

  @Post('/add')
  create(@Body() staff: StaffEntity): Promise<StaffEntity> {
    return this.staffService.create(staff);
  }

    @Get('/getallstaff')
    async findAll(): Promise<StaffEntity[]> {
      return this.staffService.findAll();
    }

    @Get('/get/:id')
    async findOne(@Param('id') id) {
    return await this.staffService.findOne(id);
  }
//   @Post('/login')
//   async login(@Body() req:any,   @Response({passthrough: true}) response: Response) {
//   return this.adminService.login(req,response);
//   }  
//   @Post('/logout')
//   async logout(@Response({passthrough: true}) response: Response) {
//   return this.adminService.logout(response);
//   }
 
}
