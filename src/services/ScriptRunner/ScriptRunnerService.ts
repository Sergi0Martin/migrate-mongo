import path = require('path');
import { exec } from 'child_process';
import { MongoClient } from 'mongodb';
import * as Migrations from '../../../migrations/index';

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

export async function ApplyMigrationChanges(
  client: MongoClient,
  DB_NAME: string,
): Promise<void> {
  const session = client.startSession();
  await session.withTransaction(async (options) => {
    options.timeoutMS = 100000;
    try {
      const db = client.db(DB_NAME);

      await new Migrations.M001AlterAProperty().up(db, client);
      
      // runTypeScriptFile('./migrations/001-AlterAProperty.ts');
    } finally {
      await session.endSession();
    }
  });
}
