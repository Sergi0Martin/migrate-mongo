import { MongoClient } from 'mongodb';
import { Do, runTypeScriptFile } from './ScriptRunner/ScriptRunnerService';
import type { MongoClientOptions } from 'mongodb';

export async function Migrate(
  DB_CONN_STRING: string,
  DB_NAME: string,
): Promise<void> {
  const options: MongoClientOptions = {
    connectTimeoutMS: 50000,
    timeoutMS: 50000,
    socketTimeoutMS: 50000,
    maxIdleTimeMS: 50000,
    appName: 'migrate-mongo',
  };
  const client: MongoClient = new MongoClient(DB_CONN_STRING, options);
  await client.connect();
  try {
    if (!(await ExistPendingMigrations(client, DB_NAME))) {
      console.log('No pending migrations');
      return await Promise.resolve();
    }

    /// Desde aquí debería cargar los archivos de migración y ejecutarlos (cada archivo modifica una collection diferente)
    // for file in migrationFiles

    await Do(client, DB_NAME);

    ///end for file
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }

  return await Promise.resolve();
}

async function ExistPendingMigrations(
  client: MongoClient,
  DB_NAME: string,
): Promise<boolean> {
  let result = false;

  const session = await client.startSession();
  await session.withTransaction(async (options) => {
    options.timeoutMS = 100000;
    try {
      const db = client.db(DB_NAME);

      // TODO comprobar que en la colección de migraciones no existan registros con el mismo nombre de archivo
      result = true;
    } finally {
      await session.endSession();
    }
  });

  return result;
}
