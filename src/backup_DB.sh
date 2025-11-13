#!/bin/bash

backup_date=$(date +%F)
file_name="${backup_date}_backup.dump"

# Run pg_dump inside the container
docker exec -t DIAMOND_DATABASE pg_dump -U diamond -d DIAMOND -F c -f /tmp/$file_name

# Copy the dump file out of the container
docker cp DIAMOND_DATABASE:/tmp/$file_name ./$file_name

echo "✅ Backup saved as $file_name"

