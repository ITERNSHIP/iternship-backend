import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5444,
  username:'postgres',
  password: 'password',
  database: 'apprenticeships',
  entities: ['dist/Apprenticeships/entities/*.js'],
  synchronize: true,
  logging:false
};

