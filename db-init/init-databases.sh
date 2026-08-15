#!/bin/bash
set -e

for db in auth_db car_db booking_db payment_db notification_db; do
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $db;
EOSQL
done
