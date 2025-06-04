DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_roles
      WHERE  rolname = 'home_library_user') THEN

      CREATE ROLE home_library_user LOGIN PASSWORD 'KqCQzyH2akGB9gQ4';
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO home_library_user;
      ALTER ROLE home_library_user WITH CREATEDB;
   END IF;
END
$do$;

CREATE EXTENSION pgcrypto;
