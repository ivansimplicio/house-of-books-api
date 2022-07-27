import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import ormConfig from 'ormconfig';
import { join } from 'path';
import { CategoriesModule } from './modules/categories/categories.module';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordsModule } from './modules/passwords/passwords.module';
import mailerConfig from './services/mailer/config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    MailerModule.forRoot(mailerConfig),
    CategoriesModule,
    BooksModule,
    UsersModule,
    AddressesModule,
    OrdersModule,
    AuthenticationModule,
    AuthorizationModule,
    PasswordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
