# E-Commerce Platform

A complete e-commerce solution with a PHP backend API and a responsive frontend built with HTML, Tailwind CSS, and jQuery.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend API](#backend-api)
- [Frontend](#frontend)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)

## Overview

This project provides a complete e-commerce platform with product and order management capabilities. The backend is built with PHP and provides RESTful API endpoints, while the frontend offers a responsive user interface with a professional black and red color scheme.

## Features

- **Product Management**
  - List all products
  - View product details
  - Create new products
  - Update existing products
  - Delete products

- **Order Management**
  - List all orders
  - View order details
  - Create new orders
  - Update existing orders
  - Delete orders

- **Responsive Design**
  - Works on mobile, tablet, and desktop devices
  - Professional black and red color scheme
  - Intuitive user interface

## Project Structure

### Backend (PHP)

```
e-commerce/
├── config/
│   └── config.php           # Database configuration
├── public/
│   └── index.php            # API entry point
└── src/
    ├── controllers/
    │   ├── OrderController.php  # Order CRUD operations
    │   └── ProductController.php # Product CRUD operations
    ├── core/
    │   └── Database.php     # Database connection handler
    └── models/
        ├── Order.php        # Order model
        └── Product.php      # Product model
```

### Frontend (HTML/CSS/JS)

```
e-commerce-frontend/
├── css/
│   └── styles.css           # Custom styles beyond Tailwind
├── js/
│   ├── api/
│   │   └── api.js           # API service for backend communication
│   ├── utils/
│   │   └── helpers.js       # Helper functions
│   ├── views/
│   │   ├── products.js      # Products view controller
│   │   └── orders.js        # Orders view controller
│   └── main.js              # Main application entry point
├── views/
│   ├── products/
│   │   ├── list.html        # Products list view
│   │   └── form.html        # Product add/edit form
│   ├── orders/
│   │   ├── list.html        # Orders list view
│   │   └── form.html        # Order add/edit form
│   └── shared/
│       ├── navigation.html  # Shared navigation component
│       ├── footer.html      # Shared footer component
│       └── components.html  # Shared UI components
└── index.html               # Main HTML entry point
```

## Backend API

The backend provides a RESTful API with the following endpoints:

### Products

- `GET /products` - Get all products
- `GET /products/{id}` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/{id}` - Update a product
- `DELETE /products/{id}` - Delete a product

### Orders

- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get a specific order
- `POST /orders` - Create a new order
- `PUT /orders/{id}` - Update an order
- `DELETE /orders/{id}` - Delete an order

## Frontend

The frontend is built with HTML, Tailwind CSS, and jQuery, providing a responsive and intuitive user interface for managing products and orders.

### Key Components

- **API Service**: Handles communication with the backend API
- **View Controllers**: Manage UI interactions for products and orders
- **Helper Functions**: Provide utility functions for formatting, notifications, etc.
- **Responsive Design**: Adapts to different screen sizes using Tailwind CSS

## Setup Instructions

### Backend Setup

1. Place the `e-commerce` directory in your web server's document root
2. Configure your database settings in `config/config.php`
3. Create the required database tables:

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Frontend Setup

1. Place the `e-commerce-frontend` directory in your web server's document root
2. Open `js/api/api.js` and update the `baseUrl` to match your backend API URL:

```javascript
baseUrl: 'http://your-server-path/e-commerce/public/index.php?endpoint='
```

3. Open `index.html` in your web browser

## API Documentation

### Product Endpoints

#### Get All Products

```
GET /products
```

Response:
```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 19.99
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 29.99
  }
]
```

#### Get Product by ID

```
GET /products/{id}
```

Response:
```json
{
  "id": 1,
  "name": "Product 1",
  "price": 19.99
}
```

#### Create Product

```
POST /products
```

Request:
```json
{
  "name": "New Product",
  "price": 39.99
}
```

Response:
```json
{
  "message": "Produit ajouté"
}
```

#### Update Product

```
PUT /products/{id}
```

Request:
```json
{
  "name": "Updated Product",
  "price": 49.99
}
```

Response:
```json
{
  "message": "Produit mis à jour"
}
```

#### Delete Product

```
DELETE /products/{id}
```

Response:
```json
{
  "message": "Produit supprimé"
}
```

### Order Endpoints

Similar structure to product endpoints, with order-specific data.

## Technologies Used

### Backend
- PHP 7.4+
- MySQL/MariaDB
- PDO for database access

### Frontend
- HTML5
- Tailwind CSS for styling
- jQuery for DOM manipulation and AJAX
- JavaScript ES6+

## Development Approach

The project follows a modular approach with clear separation of concerns:

1. **Backend**: MVC architecture with controllers, models, and a core database layer
2. **Frontend**: Modular JavaScript with separate files for API, helpers, and view controllers
3. **Responsive Design**: Mobile-first approach using Tailwind CSS
4. **Error Handling**: Comprehensive error handling on both frontend and backend

This architecture makes the codebase maintainable, scalable, and easy to understand.
