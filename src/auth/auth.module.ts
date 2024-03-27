import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
