//run with this command => npx tsx mongo-migrator.ts build

import { Argument, Command } from "commander";

const program = new Command()
  .name("mongo-migrator")
  .description("CLI for mongo-migrator")
  .version("1.0.0");

// program
//   .command("build")
//   .description("Build the monorepo")
//   .action(async () => {
//     console.log("Building...");
//     // run your build steps ...
//   });

program
  .command("update-database")
  .description("Run migrations")
  .addArgument(
    new Argument(
      "<ConnectionString>",
      "Connection string to the database"
    ).argRequired()
  )
  .action(async (ConnectionString, arg2) => {
    console.log("Applying migrations to database...");
    console.log("Connection String: ", ConnectionString);
    console.log("Arg2: ", arg2);
    // run your steps ...
  });

program.parse();
