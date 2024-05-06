import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // console.log(request.headers);
    const headerAuth = request.headers.authorization;
    // console.log(request.headers.authorization);
    if (!headerAuth) {
      // If no token, allow the request to continue without authentication
      return true;
    }

    const token = headerAuth.split(' ')[1] || undefined;
    const checkToken = await this.authService.verifyAccessToken(token);
    // console.log(checkToken);
    if (checkToken) {
      const requiredRole = this.reflector.get<string>(
        'role',
        context.getHandler(),
      );

      if (requiredRole) {
        const userRole = checkToken.role;
        // console.log(userRole);
        if (userRole == 'admin') {
          return true;
        } else {
          response.status(403).json({ message: 'Bạn không có quyền' });
          return false;
        }
      }
      return true;
    }

    response.status(401).json({ message: 'Unauthorized' });
    return false;
  }
}
