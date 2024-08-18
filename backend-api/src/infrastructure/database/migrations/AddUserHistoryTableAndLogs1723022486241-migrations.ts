import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserHistoryTableAndTrigger1691433600000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the users_history table
    await queryRunner.query(`
            CREATE TABLE users_history (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                action VARCHAR(10) NOT NULL,
                action_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                action_by VARCHAR(100),
                old_data JSONB,
                new_data JSONB
            )
        `);

    // Create the trigger function
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION log_user_changes()
            RETURNS TRIGGER AS $$
            BEGIN
                IF (TG_OP = 'DELETE') THEN
                    INSERT INTO users_history (user_id, action, action_by, old_data)
                    VALUES (OLD.id, 'DELETE', current_user, row_to_json(OLD));
                ELSIF (TG_OP = 'UPDATE') THEN
                    INSERT INTO users_history (user_id, action, action_by, old_data, new_data)
                    VALUES (NEW.id, 'UPDATE', current_user, row_to_json(OLD), row_to_json(NEW));
                ELSIF (TG_OP = 'INSERT') THEN
                    INSERT INTO users_history (user_id, action, action_by, new_data)
                    VALUES (NEW.id, 'INSERT', current_user, row_to_json(NEW));
                END IF;
                RETURN NULL;
            END;
            $$ LANGUAGE plpgsql;
        `);

    // Create the trigger
    await queryRunner.query(`
            CREATE TRIGGER user_changes_trigger
            AFTER INSERT OR UPDATE OR DELETE ON users
            FOR EACH ROW EXECUTE FUNCTION log_user_changes();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the trigger
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS user_changes_trigger ON users`,
    );

    // Drop the trigger function
    await queryRunner.query(`DROP FUNCTION IF EXISTS log_user_changes()`);

    // Drop the users_history table
    await queryRunner.query(`DROP TABLE IF EXISTS users_history`);
  }
}
