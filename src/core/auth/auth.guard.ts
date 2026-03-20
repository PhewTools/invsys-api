import { CanActivate, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { tenantStorage } from 'src/modules/tenant/tenant-storage';
import type { AuthTokenPayload } from './interfaces/auth-token.interface';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

interface AuthenticatedRequest extends Request {
  authUser?: AuthTokenPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: Parameters<CanActivate['canActivate']>[0]): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const payload = await this.verifyToken(token);
    const tenantContext = tenantStorage.getStore();
    if (!tenantContext) {
      throw new UnauthorizedException('Tenant context not found');
    }
    if (payload.tenantId !== tenantContext.tenantId) {
      throw new ForbiddenException('Token tenant mismatch');
    }
    request.authUser = payload;
    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const authorizationHeader = request.header('Authorization');
    if (!authorizationHeader) {
      return null;
    }
    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return null;
    }
    return token;
  }

  private async verifyToken(token: string): Promise<AuthTokenPayload> {
    try {
      return await this.jwtService.verifyAsync<AuthTokenPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}