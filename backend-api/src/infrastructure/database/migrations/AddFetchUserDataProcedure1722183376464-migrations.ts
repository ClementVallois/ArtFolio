import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class Migrations1722183376464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filePath = path.join(
      __dirname,
      '..',
      'migrations',
      'create_fetch_user_data_procedure.sql',
    );
    const sql = fs.readFileSync(filePath, 'utf8');
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION IF EXISTS fetch_user_data(UUID)`);
  }
}
