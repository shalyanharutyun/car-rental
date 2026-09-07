# 🚗 Car Rental — Full-Stack Microservices Platform

A full-stack car rental platform built with **Java, Spring Boot, Microservices, Angular, PostgreSQL, Apache Kafka, JWT/OAuth2 and Docker**.

The project is designed as a distributed application where business responsibilities are separated into independent microservices. An API Gateway provides a single entry point for the frontend, while Kafka is used for asynchronous event-driven communication between services.

---

## 📌 Overview

The Car Rental platform allows users to interact with a car rental system through a modern Angular frontend.

The backend is implemented using a **microservices architecture**, with dedicated services for:

- 🔐 Authentication and authorization
- 🚗 Car management
- 📅 Booking management
- 💳 Payment processing
- 📧 Notifications
- 🌐 API Gateway

The project also includes Docker Compose configuration for running the infrastructure and services together.

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │   Angular Frontend  │
                         │    car-rental-ui    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    API Gateway      │
                         │       :8080         │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │Auth Service │       │ Car Service │       │Booking      │
      │    :8083    │       │    :8081    │       │Service :8082│
      └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
             │                     │                       │
             ▼                     ▼                       ▼
        auth_db                car_db                 booking_db


             ┌──────────────────────┬──────────────────────┐
             │                      │
             ▼                      ▼
      ┌─────────────┐       ┌──────────────────┐
      │Payment      │       │Notification      │
      │Service :8084│       │Service :8085     │
      └──────┬──────┘       └────────┬─────────┘
             │                       │
             └───────────┬───────────┘
                         ▼
                  ┌───────────────┐
                  │ Apache Kafka  │
                  │    :9092      │
                  └───────────────┘

                  ┌───────────────┐
                  │  PostgreSQL   │
                  │     :5432     │
                  └───────────────┘
```

---

## ✨ Main Features

### 🔐 Authentication

The authentication service is responsible for user authentication and authorization.

Implemented technologies include:

- JWT authentication
- Spring Security
- OAuth2 / Google authentication configuration
- Password-based authentication
- Email configuration for authentication-related functionality
- Token expiration management

The API Gateway exposes authentication routes through:

```text
/auth/**
/oauth2/**
/login/oauth2/**
```

---

### 🚗 Car Management

The Car Service manages vehicle-related functionality.

Responsibilities include:

- Creating and managing cars
- Retrieving car information
- Serving car images
- Persisting car data using PostgreSQL
- Processing uploaded images
- Communicating with other services through Kafka events

The service runs on:

```text
http://localhost:8081
```

Through the API Gateway:

```text
/cars/**
/images/**
```

Uploaded images are stored using a configurable upload directory.

---

### 📅 Booking Service

The Booking Service manages rental bookings.

Responsibilities include:

- Creating bookings
- Managing booking information
- Communicating with the Car Service
- Publishing and consuming Kafka events
- Persisting booking data in its own PostgreSQL database

The service runs on:

```text
http://localhost:8082
```

Gateway route:

```text
/bookings/**
```

---

### 💳 Payment Service

The Payment Service is responsible for payment-related processing.

It communicates asynchronously using Apache Kafka and maintains its own database.

The service runs on:

```text
http://localhost:8084
```

Gateway route:

```text
/payments/**
```

The project defines event-based communication around payment requests and completed payments.

---

### 📧 Notification Service

The Notification Service handles notification-related operations.

It consumes Kafka events and is configured to send emails through SMTP.

The service runs on:

```text
http://localhost:8085
```

Gateway route:

```text
/notifications/**
```

---

## 📨 Event-Driven Communication

Apache Kafka is used for asynchronous communication between microservices.

The project contains a shared module:

```text
common-events
```

This module contains event classes shared by services.

Examples of event types used by the system include:

```text
PaymentRequestedEvent
PaymentCompletedEvent
```

A simplified event flow can be represented as:

```text
Booking Service
      │
      │ PaymentRequestedEvent
      ▼
Kafka
      │
      ▼
Payment Service
      │
      │ PaymentCompletedEvent
      ▼
Kafka
      │
      ├──────────────► Booking Service
      │
      └──────────────► Car Service / Notification Service
```

This approach reduces direct coupling between services and allows operations to be processed asynchronously.

---

# 🌐 API Gateway

The project uses **Spring Cloud Gateway** as the single entry point for backend communication.

Gateway:

```text
http://localhost:8080
```

Configured routes include:

| Route | Service |
|---|---|
| `/auth/**` | Auth Service |
| `/oauth2/**` | Auth Service |
| `/login/oauth2/**` | Auth Service |
| `/cars/**` | Car Service |
| `/images/**` | Car Service |
| `/bookings/**` | Booking Service |
| `/payments/**` | Payment Service |
| `/notifications/**` | Notification Service |

The Gateway also contains global CORS configuration for the Angular frontend.

---

# 🖥️ Frontend

The frontend is implemented using **Angular 22**.

Technologies include:

- Angular 22
- TypeScript
- Angular Router
- Angular Forms
- RxJS
- Bootstrap 5
- ngx-translate

Frontend development server:

```text
http://localhost:4200
```

The frontend communicates with the backend through the API Gateway instead of communicating directly with every microservice.

```text
Angular
   │
   ▼
API Gateway :8080
   │
   ├── Auth Service
   ├── Car Service
   ├── Booking Service
   ├── Payment Service
   └── Notification Service
```

---

# 🗄️ Database Architecture

The project uses **PostgreSQL**.

Each major backend service has its own database, following the microservices database-per-service approach.

| Service | Database |
|---|---|
| Auth Service | `auth_db` |
| Car Service | `car_db` |
| Booking Service | `booking_db` |
| Payment Service | `payment_db` |
| Notification Service | `notification_db` |

PostgreSQL runs on:

```text
localhost:5432
```

The Docker Compose configuration uses PostgreSQL 16.

---

# 🛠️ Technology Stack

## Backend

| Technology | Purpose |
|---|---|
| Java 21 | Programming language |
| Spring Boot | Backend framework |
| Spring Web | REST APIs |
| Spring Data JPA | Database access |
| Hibernate | ORM |
| Spring Security | Security |
| JWT | Authentication |
| OAuth2 | Google authentication |
| Spring Cloud Gateway | API Gateway |
| Spring Kafka | Kafka integration |
| Maven | Build & dependency management |

## Frontend

| Technology | Purpose |
|---|---|
| Angular 22 | Frontend framework |
| TypeScript | Frontend language |
| RxJS | Reactive programming |
| Angular Router | Navigation |
| Angular Forms | Form handling |
| Bootstrap 5 | UI styling |
| ngx-translate | Internationalization |

## Infrastructure

| Technology | Purpose |
|---|---|
| PostgreSQL 16 | Relational database |
| Apache Kafka | Event streaming |
| Zookeeper | Kafka coordination |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Git / GitHub | Version control |

---

# 📂 Project Structure

```text
car-rental/
│
├── api-gateway/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── auth-service/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── booking-service/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── car-service/
│   ├── src/
│   ├── uploads/
│   ├── Dockerfile
│   └── pom.xml
│
├── payment-service/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── notification-service/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── common-events/
│   └── src/
│
├── car-rental-ui/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── angular.json
│
├── db-init/
│
├── docker-compose.yml
├── .env.example
├── pom.xml
└── README.md
```

---

# 🔌 Service Ports

| Component | Port |
|---|---:|
| Angular UI | `4200` |
| API Gateway | `8080` |
| Car Service | `8081` |
| Booking Service | `8082` |
| Auth Service | `8083` |
| Payment Service | `8084` |
| Notification Service | `8085` |
| PostgreSQL | `5432` |
| Kafka | `9092` |
| Zookeeper | `2181` |

---

# ⚙️ Requirements

Before running the project locally, make sure you have:

- Java 21
- Maven
- Node.js
- npm
- Angular CLI
- Docker Desktop
- Git

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/shalyanharutyun/car-rental.git

cd car-rental
```

---

# 🐳 Running with Docker Compose

The repository contains a complete `docker-compose.yml` configuration for the application infrastructure and services.

Start the project with:

```bash
docker compose up --build
```

This starts:

- PostgreSQL
- Zookeeper
- Kafka
- Auth Service
- Car Service
- Booking Service
- Payment Service
- Notification Service
- API Gateway
- Angular UI

The frontend is exposed on:

```text
http://localhost
```

The API Gateway is exposed on:

```text
http://localhost:8080
```

To stop the containers:

```bash
docker compose down
```

To stop containers and remove persistent PostgreSQL volume:

```bash
docker compose down -v
```

> ⚠️ The `-v` option removes the PostgreSQL Docker volume and therefore deletes persisted database data.

---

# 🔑 Environment Variables

The project provides an `.env.example` file.

Create:

```text
.env
```

in the root directory and configure the required values.

Example:

```env
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Do not commit real credentials or secrets to GitHub.

---

# 💻 Running Backend Without Docker

The root Maven project contains the backend modules:

```text
common-events
car-service
auth-service
booking-service
payment-service
notification-service
api-gateway
```

Build the complete Maven project:

```bash
./mvnw clean install
```

On Windows:

```powershell
.\mvnw.cmd clean install
```

Individual services can then be started from their respective directories.

Example:

```bash
cd auth-service
./mvnw spring-boot:run
```

Windows:

```powershell
cd auth-service
.\mvnw.cmd spring-boot:run
```

Repeat the same approach for the other services.

---

# 🅰️ Running the Angular Frontend

Navigate to the frontend:

```bash
cd car-rental-ui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The configured npm start script runs Angular with the project's proxy configuration.

The application will be available at:

```text
http://localhost:4200
```

---

# 🔐 Authentication Flow

The application uses JWT-based authentication.

A simplified authentication flow is:

```text
User
 │
 │ Login credentials
 ▼
Angular Frontend
 │
 ▼
API Gateway
 │
 ▼
Auth Service
 │
 │ Validate credentials
 │
 ▼
JWT Token
 │
 ▼
Angular Frontend
 │
 │ Authorization: Bearer <token>
 ▼
API Gateway
 │
 ▼
Protected Microservice
```

OAuth2 / Google authentication is also configured in the Auth Service.

---

# 📡 API Overview

The API Gateway exposes the main backend resources through:

```text
/auth/**
/cars/**
/images/**
/bookings/**
/payments/**
/notifications/**
```

### Authentication

```http
POST /auth/login
```

Authentication-related OAuth2 endpoints:

```text
/oauth2/**
/login/oauth2/**
```

### Cars

```text
/cars/**
/images/**
```

### Bookings

```text
/bookings/**
```

### Payments

```text
/payments/**
```

### Notifications

```text
/notifications/**
```

For the exact request/response models and available endpoints, refer to the corresponding controllers inside each service.

---

# 🧪 API Testing

Backend APIs can be tested using tools such as:

- Postman
- IntelliJ HTTP Client
- cURL

A typical testing flow is:

```text
1. Register/Login
       ↓
2. Receive JWT
       ↓
3. Add JWT as Bearer Token
       ↓
4. Access protected endpoints
       ↓
5. Test Cars / Bookings / Payments
```

---

# 🔒 Security

Security-related technologies used in the project include:

- Spring Security
- JWT authentication
- OAuth2 / Google authentication
- Bearer token authorization
- Password-based authentication
- CORS configuration
- Environment-based credentials

Sensitive credentials should always be provided through environment variables rather than committed into source control.

---

# 📦 Docker Architecture

Each backend service has its own Dockerfile.

The Docker Compose environment contains:

```text
                    Docker Compose
                         │
        ┌────────────────┼─────────────────┐
        │                │                 │
    PostgreSQL         Kafka           Zookeeper
        │                │
        └────────────────┼─────────────────┐
                         │                 │
              ┌──────────┴──────────┐      │
              │                     │      │
          Microservices        API Gateway │
              │                     │      │
              └──────────┬──────────┘      │
                         │
                    Angular UI
```

The project also uses a persistent PostgreSQL volume.

---

# 📈 Design Principles

The project demonstrates several important backend architecture concepts:

### Microservices

Business functionality is split into independent services.

### Database per Service

Services use separate PostgreSQL databases instead of sharing a single application database.

### API Gateway

The frontend communicates with a single backend entry point.

### Event-Driven Architecture

Kafka provides asynchronous communication between services.

### Separation of Responsibilities

Each service has a clearly defined business responsibility.

### Containerization

Docker provides a consistent runtime environment for the distributed system.

---

# 🔮 Future Improvements

Potential improvements for the project include:

- [ ] Production-ready secret management
- [ ] Centralized configuration management
- [ ] Service discovery
- [ ] Distributed tracing
- [ ] Centralized logging
- [ ] More comprehensive automated tests
- [ ] CI/CD pipeline improvements
- [ ] Production deployment configuration
- [ ] API documentation with OpenAPI / Swagger
- [ ] Monitoring with Prometheus and Grafana
- [ ] More advanced booking availability validation
- [ ] Production payment provider integration

---

# 📚 What This Project Demonstrates

This project demonstrates practical experience with:

- Java 21
- Spring Boot
- Spring Security
- JWT
- OAuth2
- REST APIs
- Spring Data JPA
- Hibernate
- PostgreSQL
- Microservices architecture
- Spring Cloud Gateway
- Apache Kafka
- Event-driven communication
- Angular
- TypeScript
- Docker
- Docker Compose
- Maven
- Git/GitHub

---

# 👨‍💻 Author

**Harut Shalyan**

Java Full Stack Developer

Focused on:

- Java
- Spring Boot
- Microservices
- REST APIs
- Spring Security
- Angular
- PostgreSQL
- Docker

---

## ⭐ Project

If you find this project useful or interesting, feel free to explore the repository, open an issue, or suggest an improvement.

**Repository:**  
https://github.com/shalyanharutyun/car-rental