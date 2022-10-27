import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminEntity } from './Apprenticeships/entities/admin.entity';
import { CompanyEntity } from './Apprenticeships/entities/company.entity';
import { RegisterEntity } from './Apprenticeships/entities/regis.entity';
import { StaffEntity } from './Apprenticeships/entities/staff.entity';
import { UserEntity } from './Apprenticeships/entities/user.entity';
import { AdminModule } from './Apprenticeships/module/admin.module';
import { CompanyModule } from './Apprenticeships/module/company.module';
import { StaffModule } from './Apprenticeships/module/staff.module';
import { UserModule } from './Apprenticeships/module/user.module';
import { typeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [UserEntity,AdminEntity,CompanyEntity,RegisterEntity,StaffEntity,TypeOrmModule.forRoot(typeOrmConfig)
    ,UserModule,CompanyModule,AdminModule,StaffModule,
    MulterModule.register({
      dest: './files',
    })],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
