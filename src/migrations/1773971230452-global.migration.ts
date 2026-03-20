import { MigrationInterface, QueryRunner } from "typeorm";

export class Global1773971230452 implements MigrationInterface {
    name = 'Global1773971230452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenant_pt"."suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "phone" character varying, "address" character varying, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ADD "supplierId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ALTER COLUMN "imageUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ADD CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8" FOREIGN KEY ("supplierId") REFERENCES "tenant_pt"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" DROP CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8"`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" ALTER COLUMN "imageUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_pt"."products" DROP COLUMN "supplierId"`);
        await queryRunner.query(`DROP TABLE "tenant_pt"."suppliers"`);
    }

}
