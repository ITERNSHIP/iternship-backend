import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config()
export const typeOrmConfig: TypeOrmModuleOptions = {
// type: 'postgres',
  // host: 'localhost',
  // port: 5444,
  // username:'postgres',
  // password: 'password',
  // database: 'apprenticeships',
  // entities: ['dist/Apprenticeships/entities/*.js'],
  // synchronize: true,
  // logging:false
  //
  type: 'postgres',
  host: process.env.DB_HOST_IP,
  port: parseInt(<string> process.env.DB_PORT),
  username:process.env.DB_USR,
  password: process.env.DB_PASS,
  database: process.env.DB,
  entities: ['dist/Apprenticeships/entities/*.js'],
  synchronize: true,
  logging:false
};

