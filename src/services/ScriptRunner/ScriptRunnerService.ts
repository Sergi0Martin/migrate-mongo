import path = require('path');
import { exec } from 'child_process';
import { MongoClient } from 'mongodb';

export function runTypeScriptFile(filePath) {
  const absolutePath = path.resolve(filePath);
  exec(`ts-node ${absolutePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing file: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
}

export async function Do(client: MongoClient, DB_NAME: string): Promise<void> {
  const session = await client.startSession();
  await session.withTransaction(async (options) => {
    options.timeoutMS = 100000;
    try {
      const db = client.db(DB_NAME);

      // const query = { _id: new ObjectId(id) };
      const query = { TradeName: '/Deudores/' };

      await db
        .collection('ACCReadCustomers')
        .updateMany(query, { $set: { TradeName: 'Deudores (euros) 2' } });

      runTypeScriptFile('./migrations/001-AlterAProperty.ts');
    } finally {
      return await session.endSession();
    }
  });
}
