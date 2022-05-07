import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Apprenticeships/appShip.module';
import { AdminEntity } from './Apprenticeships/entities/admin.entity';
import { CompanyEntity } from './Apprenticeships/entities/company.entity';
import { RegisterEntity } from './Apprenticeships/entities/regis.entity';
import { StaffEntity } from './Apprenticeships/entities/staff.entity';
import { UserEntity } from './Apprenticeships/entities/user.entity';
import { CompanyModule } from './Apprenticeships/module/company.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [UserEntity,AdminEntity,CompanyEntity,RegisterEntity,StaffEntity,TypeOrmModule.forRoot(typeOrmConfig)
    ,UserModule,CompanyModule],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
