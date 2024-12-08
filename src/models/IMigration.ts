import { Db, MongoClient } from 'mongodb';

export interface IMigration {
  up: (db: Db, client: MongoClient) => Promise<void>;
  down: (db: Db, client: MongoClient) => Promise<void>;
}
