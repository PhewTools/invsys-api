import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TenantDataSourceProvider } from '../providers/tenant.provider';
import { TenantDatasourceManager } from 'src/modules/tenant/tenant-datasource-manager';
import { UserService } from 'src/modules/user/user.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService): JwtModuleOptions => ({
            secret: config.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: config.get<number>('JWT_EXPIRATION_TIME'),
            },
        }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard}, TenantDataSourceProvider, TenantDatasourceManager, UserService],
  exports: [AuthService,  JwtModule],
})
export class AuthModule {}