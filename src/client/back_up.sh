#!/bin/bash
                               
backup_date=$(date +%F)
file_name="${backup_date}_backup.dump"

# Run pg_dump inside the container
docker exec -t DIAMOND_DB_DEV_CONN pg_dump -U diamond -d DIAMOND_DB -F c -f /tmp/$file_name

# Copy the dump file out of the container
docker cp DIAMOND_DB_DEV_CONN:/tmp/$file_name ./backup_DB/$file_name

echo "✅ Backup saved as $file_name"
     