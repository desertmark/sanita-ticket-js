#!/bin/sh

echo "Starting restoring backup for host: $HOST DB: $DB"
echo $PASSWORD | pg_restore -h $HOST -p $PORT -U $USER -d $DB -1 -a -t tickets $RESTORE_FILE

echo "Restore completed"
exit 0
 