#!/bin/sh

echo "Starting backup for host: $HOST DB: $DB"
echo $PASSWORD | pg_dump -h $HOST -U $USER -W -F t $DB >> /backup/backup_$(date +%Y-%m-%dT%H-%M-%S).tar

echo "Backup completed"
exit 0
 