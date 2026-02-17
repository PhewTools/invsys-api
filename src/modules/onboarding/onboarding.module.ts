import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TenantModule } from '../tenant/tenant.module';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { OnboardingProcessor } from './onboarding.processor';
import { ONBOARDING_QUEUE } from './onboarding.constants';

@Module({
  imports: [
    BullModule.registerQueue({ name: ONBOARDING_QUEUE }),
    TenantModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, OnboardingProcessor],
})
export class OnboardingModule {}
