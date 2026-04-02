import { compare } from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { TENANT_DATA_SOURCE } from 'src/core/providers/tenant.provider';
import { tenantStorage } from 'src/modules/tenant/tenant-storage';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import type { AuthTokenPayload } from './interfaces/auth-token.interface';
import { UserService } from 'src/modules/user/user.service';

interface LoginParams {
  readonly email: string;
  readonly password: string;
}

interface AuthTokenResult {
  readonly accessToken: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  public async login(params: LoginParams): Promise<AuthTokenResult> {
    const user = await this.userService.findOneByEmail(params.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await compare(params.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tenantContext = tenantStorage.getStore();
    if (!tenantContext) {
      throw new UnauthorizedException('Tenant context not found');
    }
    const payload: AuthTokenPayload = {
      sub: user.id,
      userFullName: user.name,
      tenantId: tenantContext.tenantId,
      role: user.role,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}