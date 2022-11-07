import { Body, Controller, Delete, Get, Param, Post, Put,Response } from '@nestjs/common';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
import { AdminService } from '../service/admin.service';



@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService){}

  @Post('/add')
  create(@Body() admin: AdminEntity): Promise<AdminEntity> {
    return this.adminService.create(admin);
  }

    @Post('/limitAccount/:id')
    async limitAccount(@Param('id') id) {
    return this.adminService.limitAccount(id)

    }

    @Post('/unSuspendAccount/:id')
    async unSuspendAccount(@Param('id') id) {
    return this.adminService.unSuspendAccount(id)

    }

    @Get('/getalladmin')
    async findAll(): Promise<AdminEntity[]> {
      return this.adminService.findAll();
    }

    @Get('/get/:id')
    async findOne(@Param('id') id) {
    return await this.adminService.findOne(id);
  
  }

      @Get('/getAllCompany')
    async getAllCompany(): Promise<CompanyEntity[]> {
      return this.adminService.getAllCompany();
    }

    @Post('/createStaff')
   async createStaff(@Body() staff: StaffEntity): Promise<StaffEntity> {
      return this.adminService.createStaff(staff);
    }


  @Post('/login')
  async login(@Body() req:any,   @Response({passthrough: true}) response: Response) {
  return this.adminService.login(req,response);
  }  
  @Post('/logout')
  async logout(@Response({passthrough: true}) response: Response) {
  return this.adminService.logout(response);
  }
 
}
