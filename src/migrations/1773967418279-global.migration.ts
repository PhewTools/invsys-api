import { MigrationInterface, QueryRunner } from "typeorm";

export class Global1773967418279 implements MigrationInterface {
    name = 'Global1773967418279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" RENAME COLUMN "quantity" TO "imageUrl"`);
        await queryRunner.query(`CREATE TABLE "tenant_pt"."inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "warehouseId" uuid NOT NULL, "quantity" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "zip" character varying`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ADD "imageUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."inventory" ADD CONSTRAINT "FK_c8622e1e24c6d054d36e8824490" FOREIGN KEY ("productId") REFERENCES "tenant_pt"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."inventory" ADD CONSTRAINT "FK_00e0948a0a75d2d5a19bc1106e8" FOREIGN KEY ("warehouseId") REFERENCES "tenant_pt"."warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_pt"."inventory" DROP CONSTRAINT "FK_00e0948a0a75d2d5a19bc1106e8"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."inventory" DROP CONSTRAINT "FK_c8622e1e24c6d054d36e8824490"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ADD "imageUrl" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."warehouses" DROP COLUMN "city"`);
        await queryRunner.query(`DROP TABLE "tenant_pt"."inventory"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" RENAME COLUMN "imageUrl" TO "quantity"`);
    }

}
