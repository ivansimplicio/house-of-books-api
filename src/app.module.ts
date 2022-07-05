import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import ormConfig from 'ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
