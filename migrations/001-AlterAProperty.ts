// create a new migration file extending from an interface
// which has the up and down methods

import { IMigration } from '../src/models/IMigration';
import { Db, MongoClient } from 'mongodb';

export class M001AlterAProperty implements IMigration {
  async up(db: Db, client: MongoClient) {
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    // const query = { _id: new ObjectId(id) };
    const query = { TradeName: '/Deudores/' };

    await db
      .collection('ACCReadCustomers')
      .updateMany(query, { $set: { TradeName: 'Deudores (euros) 3' } });
  }

  down: (db: Db, client: MongoClient) => Promise<void>;
}
