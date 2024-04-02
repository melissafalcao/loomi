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
      if (!decoded || !decoded['userId']) {
        throw new UnauthorizedException('Token inválido');
      }

      if (decoded['userType'] === 'admin') {
        return true;
      }
      const requestedUserId = request.params.userId;
      if (decoded['userId'] !== requestedUserId) {
        throw new UnauthorizedException('Acesso Negado');
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
