import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getByEmail(email);

    if (user && (await this.userService.comparePassword(user, password))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async generateToken(userId: number, userType: string): Promise<string> {
    return this.jwtService.sign({ userId, userType });
  }
}
