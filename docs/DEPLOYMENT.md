# Deployment Guide

## Prerequisites
- Docker and Docker Compose
- Node.js 16 or higher
- Access to production environment

## Deployment Steps

1. Build and Deploy
```bash
# Build Docker images
docker-compose -f deploy/docker-compose.yml build

# Start services
docker-compose -f deploy/docker-compose.yml up -d
```

2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

3. Monitoring Setup
- Access Prometheus: http://your-domain:9090
- Access Grafana: http://your-domain:3001
- Default credentials in production.env

4. Backup Strategy
```bash
# Make backup script executable
chmod +x deploy/backup.sh

# Add to crontab for daily backups
0 0 * * * /path/to/deploy/backup.sh
```

## Health Checks

Monitor application health at:
- /health - Basic health check
- /metrics - Prometheus metrics

## Scaling

To scale the application:
```bash
docker-compose -f deploy/docker-compose.yml up -d --scale app=3
```

## Troubleshooting

1. Check logs:
```bash
docker-compose -f deploy/docker-compose.yml logs -f app
```

2. Monitor resources:
```bash
docker stats
```

3. Restart services:
```bash
docker-compose -f deploy/docker-compose.yml restart
```
