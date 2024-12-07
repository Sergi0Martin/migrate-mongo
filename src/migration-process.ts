import { MongoClient } from 'mongodb';
import { runTypeScriptFile } from './services/fileService';
import type { MongoClientOptions } from 'mongodb';

// export class MigrationProcess{

//     public migrationUp(params: string) {
//             console.log('Migration process started');
//     }
// }

export async function MigrationUp(DB_CONN_STRING: string | undefined, DB_NAME: string | undefined): Promise<void> {
  console.log('Migration UP process started...');

  if (!DB_CONN_STRING) {
    console.error('Connection string is missing');
    return;
  }

  if (!DB_NAME) {
    console.error('Database name is missing');
    return;
  }

  const options: MongoClientOptions = {
    connectTimeoutMS: 50000,
    timeoutMS: 50000,
    socketTimeoutMS: 50000,
    maxIdleTimeMS: 50000,
    appName: 'migrate-mongo',
  };
  const client: MongoClient = new MongoClient(DB_CONN_STRING, options);
  await client.connect();
  /// Desde aquí debería cargar los archivos de migración y ejecutarlos (cada archivo modifica una collection diferente)
  // for file in migrationFiles


  const session = await client.startSession();
  await session.withTransaction(async (options) => {
    options.timeoutMS = 100000;
    try {
      const db = client.db(DB_NAME);

      // const query = { _id: new ObjectId(id) };
      const query = { TradeName: '/Deudores/' };

      await db.collection('ACCReadCustomers').updateMany(query, { $set: { TradeName: 'Deudores (euros) 2' } });

      runTypeScriptFile('src/migrations/prueba01.ts');
    } finally {
      await session.endSession();
    }
  });

  ///end for file

  await client.close();

  console.log('... migration UP process end');
}

export async function MigrationDown(DB_CONN_STRING: string | undefined, DB_NAME: string | undefined): Promise<void> {
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
