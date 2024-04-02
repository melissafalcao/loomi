import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Client } from 'src/client/client.entity';
import { Product } from 'src/product/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Product]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
