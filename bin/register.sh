#!/bin/bash
# Register new user in database
echo Enter username:
read username
echo Enter password:
read -s password
db_url=( $DB_URL )
../user_register $username $password $db_url
