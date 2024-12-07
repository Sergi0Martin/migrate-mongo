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

export function runTypeScriptFile(filePath) {
  const { exec } = require('child_process');
  const path = require('path');

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

