#!/bin/bash

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
APP_NAME="appControllerAI"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup source code
tar -czf $BACKUP_DIR/${APP_NAME}_${TIMESTAMP}_code.tar.gz ../src

# Backup environment files
cp ../.env $BACKUP_DIR/${APP_NAME}_${TIMESTAMP}_env

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -name "${APP_NAME}_*" -delete

echo "Backup completed: ${TIMESTAMP}"
