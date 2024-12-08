// create a new migration file extending from an interface
// which has the up and down methods

import { ScriptRunner } from '../src/services/ScriptRunner/ScriptRunner';
import { MigrationScript } from '../src/models/MigrationScript';

export class M001AlterAProperty implements MigrationScript {
  public async up(): Promise<void> {
    // await scriptRunner.ScriptRunner(`ALTER TABLE "table_name" ADD COLUMN "column_name" VARCHAR(255)`);
  }

  public async down(): Promise<void> {
    // await queryRunner.RunMigration(`ALTER TABLE "table_name" DROP COLUMN "column_name"`);
  }
}
