import { IMigration } from '../../models/IMigration';

export class ScriptRunner {
  constructor(private queryRunner: ScriptRunner) {}

  public async RunMigration(
    script: IMigration,
    direction: 'up' | 'down',
  ): Promise<void> {
    // if (direction === 'up') {
    //   await script.up();
    // } else {
    //   await script.down();
    // }
  }
}
