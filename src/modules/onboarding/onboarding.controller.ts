import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { Public } from 'src/core/auth/decorators/public.decorator';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  /**
   * Creates a new tenant and queues schema provisioning.
   */
  @Post()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  async createTenant(@Body() dto: CreateTenantDto): Promise<TenantEntity> {
    return this.onboardingService.createTenant(dto);
  }
}
