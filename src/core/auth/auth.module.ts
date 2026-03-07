import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TenantDataSourceProvider } from '../providers/tenant.provider';
import { TenantDatasourceManager } from 'src/modules/tenant/tenant-datasource-manager';
import { UserService } from 'src/modules/user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
        secret: "change-me-later",
        signOptions: {
            expiresIn: '15m',
        },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, TenantDataSourceProvider, TenantDatasourceManager, UserService],
  exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthModule {}