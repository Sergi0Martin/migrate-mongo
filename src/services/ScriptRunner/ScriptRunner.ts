import { MigrationScript } from '../../models/MigrationScript';

export class ScriptRunner {
  constructor(private queryRunner: ScriptRunner) {}

  public async RunMigration(
    script: MigrationScript,
    direction: 'up' | 'down',
  ): Promise<void> {
    if (direction === 'up') {
      await script.up();
    } else {
      await script.down();
    }
  }
}
