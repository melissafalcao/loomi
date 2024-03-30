import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token de autorização não encontrado');
    }
    try {
      const decoded = this.jwtService.verify(token);
      if (!decoded || typeof decoded !== 'object' || !decoded['userId']) {
        throw new UnauthorizedException('Token inválido');
      }
      request.user = {
        userId: decoded['userId'],
      };
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
