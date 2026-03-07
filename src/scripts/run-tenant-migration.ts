import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TenantMigrationRunner } from '../modules/tenant/tenant-migration.service';

interface CliArgs {
  readonly tenantId?: string;
  readonly schema?: string;
  readonly runAll: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  let tenantId: string | undefined;
  let schema: string | undefined;
  let runAll = false;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') {
      runAll = true;
      continue;
    }
    if (arg.startsWith('--tenantId=')) {
      tenantId = arg.split('=')[1];
      continue;
    }
    if (arg === '--tenantId') {
      tenantId = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith('--schema=')) {
      schema = arg.split('=')[1];
      continue;
    }
    if (arg === '--schema') {
      schema = argv[index + 1];
      index += 1;
    }
  }
  return { tenantId, schema, runAll };
}

function validateArgs(args: CliArgs): void {
  const providedFlags = [Boolean(args.tenantId), Boolean(args.schema), args.runAll].filter(Boolean).length;
  if (providedFlags !== 1) {
    throw new Error('Use exactly one option: --tenantId <id> OR --schema <schema_name> OR --all');
  }
}

async function run(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  validateArgs(args);
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['log', 'error', 'warn'] });
  try {
    const runner = app.get(TenantMigrationRunner);
    if (args.runAll) {
      await runner.runForAllActiveTenants();
      console.log('Migrations executed for all active tenants.');
      return;
    }
    if (args.tenantId) {
      await runner.runForTenant(args.tenantId);
      console.log(`Migrations executed for tenantId=${args.tenantId}.`);
      return;
    }
    await runner.runForSchema(args.schema as string);
    console.log(`Migrations executed for schema=${args.schema as string}.`);
  } finally {
    await app.close();
  }
}

void run().catch((error: unknown) => {
  console.error('Tenant migration failed:', error);
  process.exit(1);
});