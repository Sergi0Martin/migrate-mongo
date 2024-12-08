import * as fs from 'fs';
import path = require('path');

const DEFAULT_MIGRATIONS_DIR_NAME = 'migrations';

// export function GetPathFromMigrationFile(fileName: string): string {
//   if (!fileName) {
//     throw new Error('File path is missing');
//   }

//   let migrationPath = path.resolve(fileName);

//   if (path.isAbsolute(migrationPath)) {

//   }

//   if (!fs.existsSync(fileName)) {
//     throw new Error(`File not found: ${fileName}`);
//   }

//   return path.join(process.cwd(), DEFAULT_MIGRATIONS_DIR_NAME, fileName);
// }

export function GetPathFromMigrationFile(fileName: string) {
  if (!fileName) {
    throw new Error('File path is missing');
  }
}
