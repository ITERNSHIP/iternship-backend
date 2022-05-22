import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { StaffEntity } from '../entities/staff.entity';
import { UserEntity } from '../entities/user.entity';
import { UserMiddleware } from '../middlewares/user.middleware';
import { UserService } from '../service/user.service';


@Module({
  controllers: [UserController],
  providers: [UserService,JwtService],
  imports:[TypeOrmModule.forFeature([UserEntity,AdminEntity,CompanyEntity,RegisterEntity,StaffEntity,ConfirmationEntity])
],
  exports:[UserService]
})
export class UserModule  implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST },
      { path: 'users/logout', method: RequestMethod.POST }
      )
      .forRoutes(UserController);
  }
}