BEGIN TRANSACTION;

CREATE TABLE LOGIN (
id serial PRIMARY KEY,
Hash VARCHAR(100) not NULL,
email text UNIQUE not NULL
);

COMMIT;