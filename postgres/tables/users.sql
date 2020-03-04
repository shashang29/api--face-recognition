BEGIN TRANSACTION;

create TABLE users (
id serial PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email text UNIQUE not NULL,
entries bigint DEFAULT 0,
joined TIMESTAMP not null,
age bigint default null
);
COMMIT;