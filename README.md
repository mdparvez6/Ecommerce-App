# ECOMMERCE-APP - REST API

A simple e-commerce REST API application built using Node.js, Express.js, and PostgreSQL. This application supports user authentication, product management for sellers, and a shopping cart feature for buyers.

## Features

- **User Authentication**:
  - Sign up and log in as either a seller or a buyer.
- **Seller Functionality**:
  - Add, edit, and delete products with details like name, category, description, price, and discount.
- **Buyer Functionality**:
  - Search products by name or category.
  - Add and remove products from the shopping cart.
- **Input Validation**:
  - Ensures that the price is positive and the discount is within the range of 0-100.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Validation**: express-validator
- **Authentication**: JWT (jsonwebtoken), bcryptjs

## Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL installed and running.
- An understanding of basic Node.js and Express.js.

## Getting Started

### 1. Project Setup

1. Extract the zip file into your desired location.
2. Navigate into the project directory:
   ```bash
   cd ecommerce-app
   ```

### 2. Installation

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Set up the environment variables:
   - Create a `.env` file in the root directory of your project.
   - Add the following environment variables:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=your_postgres_username
     DB_PASSWORD=your_postgres_password
     DB_NAME=ecommerce_db
     JWT_SECRET=your_jwt_secret_key
     ```

### 3. Database Setup

1. Create a new PostgreSQL database:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```
2. Run database migrations to create the necessary tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

### 4. Running the Application

Start the application using the following command:
```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### User Authentication

- **Sign Up:** `POST /api/signup`
  - Request Body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password",
      "role": "seller" // or "buyer"
    }
    ```
- **Login:** `POST /api/login`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - Response:
    - Returns a JWT token used for further authentication.

### Seller Endpoints

- **Add Product:** `POST /api/seller/products`
  - Requires JWT token in headers (`Authorization: Bearer <token>`).
  - Request Body:
    ```json
    {
      "name": "Product Name",
      "category": "Category",
      "description": "Product Description",
      "price": 100.50,
      "discount": 10
    }
    ```

- **Edit Product:** `PUT /api/seller/products/:productId`
  - Requires JWT token in headers (`Authorization: Bearer <token>`).
  - Request Body:
    ```json
    {
      "name": "Updated Product Name",
      "category": "Updated Category",
      "description": "Updated Description",
      "price": 120.00,
      "discount": 15
    }
    ```

- **Delete Product:** `DELETE /api/seller/products/:productId`
  - Requires JWT token in headers (`Authorization: Bearer <token>`).

### Buyer Endpoints

- **Search Products:** `POST /api/buyer/products/search`
  - Request Body:
    ```json
    {
      "name": "Product Name", // optional
      "category": "Category"  // optional
    }
    ```

- **Add to Cart:** `POST /api/buyer/cart`
  - Requires JWT token in headers (`Authorization: Bearer <token>`).
  - Request Body:
    ```json
    {
      "productId": 1
    }
    ```

- **Remove from Cart:** `DELETE /api/buyer/cart`
  - Requires JWT token in headers (`Authorization: Bearer <token>`).
  - Request Body:
    ```json
    {
      "productId": 1
    }
    ```

## Input Validation

- Product price must be a positive number.
- Discount must be a positive number and not exceed 100.
- `express-validator` is used to validate and sanitize user inputs.

### Example Usage of Validation Middleware

Validation rules are applied in the seller controller and middleware to ensure that the input data is correctly formatted before processing.

## Error Handling

The application includes error handling to cover cases such as invalid input, resource not found, and database connection errors. Proper status codes are returned in responses for different error scenarios.

## Project Structure

- `controllers/` - Contains controller logic for sellers and buyers.
- `models/` - Sequelize models for Users, Products, and Cart.
- `middleware/` - Middleware for request validation and user authentication.
- `routes/` - Defines API routes.
- `config/` - Database configuration and environment setup.



## Contact

For any questions or issues, feel free to contact the project maintainer.

---

This README provides an overview of the ECOMMERCE-APP, guiding you through the setup, running, and usage of the application, along with details of the available API endpoints.
