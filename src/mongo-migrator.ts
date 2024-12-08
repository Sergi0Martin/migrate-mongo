//run with this command => npx tsx mongo-migrator.ts build
// run tsc to compile

import { Argument, Command } from 'commander';
import * as dotenv from 'dotenv';
import { MigrationUp, MigrationDown } from './migration-command-handler';

const program = new Command()
  .name('mongo-migrator')
  .description('CLI for mongo-migrator')
  .version('1.0.0');

// program
//   .command("build")
//   .description("Build the monorepo")
//   .action(async () => {
//     console.log("Building...");
//     // run your build steps ...
//   });

program
  .command('update-database')
  .description('Run migrations')
  .addArgument(
    new Argument('[ConnectionString]', 'Connection string to the database'),
  )
  .addArgument(new Argument('[DatabaseName]', 'Database name'))
  .action(async (ConnectionString, DatabaseName) => {
    dotenv.config();

    await MigrationUp(
      ConnectionString ?? process.env.DB_CONN_STRING,
      DatabaseName ?? process.env.DB_NAME,
    );
  });

program
  .command('update-database-down')
  .description('Run migrations')
  .addArgument(
    new Argument('[ConnectionString]', 'Connection string to the database'),
  )
  .addArgument(new Argument('[DatabaseName]', 'Database name'))
  .action(async (ConnectionString, DatabaseName) => {
    dotenv.config();

    await MigrationDown(
      ConnectionString ?? process.env.DB_CONN_STRING,
      DatabaseName ?? process.env.DB_NAME,
    );
  });

program.parse();
