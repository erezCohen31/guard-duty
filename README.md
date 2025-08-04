# Guard Duty

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h1 align="center">Guard Duty</h1>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/status-active-success.svg" alt="Status"></a>
  <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/nestjs-10.0.0-ea2845.svg" alt="NestJS"></a>
  <a href="#"><img src="https://img.shields.io/badge/typescript-5.0.0-3178c6.svg" alt="TypeScript"></a>
</p>

<p align="center">
  A robust security and monitoring system built with NestJS, providing real-time notifications and user management.
</p>

## 📋 Description

Guard Duty is a comprehensive security and monitoring system designed to provide real-time notifications and user management. Built with NestJS and TypeScript, it offers a scalable and maintainable architecture for handling security events and user notifications.

## ✨ Features

- 🔒 User authentication and authorization
- 🔔 Real-time notifications system
- 👥 User management
- 📊 Event monitoring and logging
- 🔄 RESTful API endpoints
- 🛡️ Role-based access control
- 📱 WebSocket support for real-time updates

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn
- PostgreSQL (v12 or later)
- Redis (for caching and real-time features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/guard-duty.git
   cd guard-duty
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

## 🏃‍♂️ Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod

# run migrations
$ npm run typeorm migration:run
```

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📦 API Documentation

After starting the application, the API documentation will be available at:
- Swagger UI: `http://localhost:3000/api`
- JSON format: `http://localhost:3000/api-json`

## 🏗 Project Structure

```
src/
├── auth/               # Authentication logic
├── common/             # Common utilities and decorators
├── config/             # Configuration files
├── database/           # Database migrations and seeds
├── notifications/      # Notifications module
│   ├── dto/           # Data Transfer Objects
│   ├── entities/       # TypeORM entities
│   └── services/       # Business logic
├── users/             # Users module
└── main.ts            # Application entry point
```

## 🚀 Deployment

### Docker

```bash
# Build the Docker image
docker build -t guard-duty .

# Run the container
docker run -p 3000:3000 --env-file .env guard-duty
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# App
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=guard_duty

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Inspired by modern security management systems
- Thanks to all contributors who have participated in this project
