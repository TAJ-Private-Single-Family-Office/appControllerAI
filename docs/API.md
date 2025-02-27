# API Documentation

## Authentication

### Token Generation
```typescript
POST /auth/token
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Using Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <your-token>
```

## Endpoints

### GET /example
Returns an example response.

**Headers:**
- Authorization: Bearer token

**Response:**
```json
{
  "message": "Example GET response"
}
```

### POST /example
Processes posted data and returns a response.

**Headers:**
- Authorization: Bearer token
- Content-Type: application/json

**Response:**
```json
{
  "message": "Example POST response",
  "data": { ... }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid token"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```
