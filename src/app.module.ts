import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'user_crud',
    password: 'root',
    database: 'db_crud',
    autoLoadEntities: true, // Automatically load entities
    synchronize: true,
  }),  
  UsersModule,
  AuthModule,
  BreedsModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
