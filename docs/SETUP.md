# Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- TypeScript (v4 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appControllerAI
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

## Development

### Running in development mode:
```bash
npm run dev
```

### Running tests:
```bash
npm test
```

### Building for production:
```bash
npm run build
```

## Configuration Options

Key environment variables:
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)
