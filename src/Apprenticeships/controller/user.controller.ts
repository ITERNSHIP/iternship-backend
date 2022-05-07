import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';


@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @Post('/add')
  create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Get('/get')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param('id') id) {
  return this.userService.findOne(id);

}

  @Put('/update/:id')
  async update(@Param('id') id, @Body() user: UserEntity): Promise<any>{
    user.userId = Number(id)
    return this.userService.update(user);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.userService.delete(id);
  }

  @Post('/createRegis')
  createRegis(@Body() regis: RegisterEntity): Promise<RegisterEntity> {
    return this.userService.createRegisterForm(regis);
  }

  @Delete('/deleteRegisterForm/:id')
  async deleteRegisterForm(@Param('id') id): Promise<any> {
    return this.userService.deleteRegisterForm(id);
  }  
  @Get('/getAllRegister')
  async findAllRegis(): Promise<RegisterEntity[]> {
    return this.userService.findAllRegis();
  }

  @Get('/getRegis/:id')
  async findOneRegis(@Param('id') id) {
  return this.userService.findOneRegis(id);
}
  @Post('/createconfirmationForm')
  async createconfirmationForm(@Body() confirmation: ConfirmationEntity) {
  return this.userService.createconfirmationForm(confirmation);
 } 
 
  @Get('/getAllconfirmation')
  async findAllconfirmationForm(): Promise<ConfirmationEntity[]> {
   return this.userService.findAllconfirmationForm();
  }  
  
  @Get('/getconfirmation/:id')
  async findOneconfirmationForm(@Param('id') id) {
  return this.userService.findOneconfirmationForm(id);
}
}
