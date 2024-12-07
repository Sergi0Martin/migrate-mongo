import * as mongoDB from 'mongodb';
import { MongoClientOptions } from 'mongodb';

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
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING, options);
  await client.connect();
  const session = await client.startSession();
  await session.withTransaction(async (options) => {
    options.timeoutMS = 100000;

    try {
      /// Desde aquí debería cargar los archivos de migración y ejecutarlos (cada archivo modifica una collection diferente)

      const db: mongoDB.Db = client.db(DB_NAME);

      // const query = { _id: new ObjectId(id) };
      const query = { TradeName: '/Deudores/' };

      await db.collection('ACCReadCustomers').updateMany(query, { $set: { TradeName: 'Deudores (euros) 2' } });
    } finally {
      await session.endSession();
    }
  });

  console.log('... migration UP process end');
}

export async function MigrationDown(params: string): Promise<void> {
  console.log('Migration Down process started');
}
