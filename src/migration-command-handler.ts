import { Migrate } from './services/migratorService';

export async function MigrationUp(
  DB_CONN_STRING: string | undefined,
  DB_NAME: string | undefined,
): Promise<void> {
  console.log('Migration UP process started...');

  if (!DB_CONN_STRING) {
    console.error('Connection string is missing');
    return;
  }

  if (!DB_NAME) {
    console.error('Database name is missing');
    return;
  }

  await Migrate(DB_CONN_STRING, DB_NAME);

  console.log('... migration UP process end');
}

export async function MigrationDown(
  DB_CONN_STRING: string | undefined,
  DB_NAME: string | undefined,
): Promise<void> {
  console.log('Migration Down process started...');

  if (!DB_CONN_STRING) {
    console.error('Connection string is missing');
    return;
  }

  if (!DB_NAME) {
    console.error('Database name is missing');
    return;
  }
}
