export interface MigrationScript {
  up(): Promise<void>;
  down(): Promise<void>;
}
