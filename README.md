# E-Commerce Admin Dashboard

A production-ready headless e-commerce admin dashboard built with **React 19**, **TypeScript**, and **ASP.NET Core 8**. Features comprehensive order management, real-time inventory tracking across multiple warehouses, order fulfillment pipeline with EasyPost shipping integration, Shopify webhook synchronization, Stripe payment processing, and advanced business analytics.

## Features

### Core Functionality
* **Order Management**: Create, view, update, and fulfill orders with real-time status tracking
* **Inventory Management**: Multi-warehouse inventory tracking with low-stock alerts
* **Product Management**: Manage products, variants, and attributes with full CRUD operations
* **Fulfillment Pipeline**: Automated order fulfillment with shipping label generation
* **Analytics Dashboard**: Revenue trends, product performance, and business insights with Recharts

### Integrations
* **Shopify**: Webhook synchronization for real-time order and product updates
* **EasyPost**: Automated shipping label generation and carrier rate comparison
* **Stripe**: Payment processing and transaction management
* **PostgreSQL**: BCNF-normalized relational database

### Technical Highlights
* **GraphQL API**: Type-safe queries and mutations with HotChocolate
* **Apollo Client**: Frontend GraphQL client with caching and optimistic updates
* **JWT Authentication**: Secure user authentication and authorization
* **Responsive UI**: Mobile-first design with Tailwind CSS and shadcn/ui components
* **Real-time Updates**: WebSocket support for live notifications (future enhancement)

## Prerequisites

### System Requirements
* **Node.js**: 18.0.0 or higher
* **.NET SDK**: 8.0 or higher
* **PostgreSQL**: 14.0 or higher
* **Git**: For version control

### Required Accounts
* **Shopify**: Store with API credentials
* **EasyPost**: Developer account with API key
* **Stripe**: (Optional) For payment processing