import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { StaffEntity } from '../entities/staff.entity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([UserEntity,AdminEntity,CompanyEntity,RegisterEntity,StaffEntity,ConfirmationEntity])],
  exports:[UserService]
})
export class UserModule {}