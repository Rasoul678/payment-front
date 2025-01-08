# Payment Frontend Project

A React-based payment management system frontend that handles payment listings, details, and filtering capabilities.

## Features

- Payment listing with pagination
- Payment details view
- Advanced filtering and search
- Responsive design
- State management with Redux
- Type-safe development with TypeScript
- URL-based query parameters
- Real-time data fetching with React Query

## Tech Stack

- React
- TypeScript
- Redux for state management
- React Query for server state
- Axios for API calls
- React Router for navigation
- ShadcnUI for components
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Rasoul678/payment-front.git
```

2. Install dependencies:

```bash
cd payment-front/frontend
```

then:

```bash
npm install
```

or

```bash
yarn install
```

3. Start servers:

```bash
npm run start-app
```

### With Docker

1. Install Docker and Docker Compose.

2. Navigate to the project directory.

```bash
cd payment-front
```

3. Run the following command to start the application:

```bash
docker-compose up
```

## Available Scripts

- `npm run dev` - Start frontend server individually
- `npm run server` - Start backend server individually
- `npm run start-app` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

#### frontend/

- ├── src/
- │ ├── components/ `# Reusable UI components`
- │ ├── store/ `# Redux store, actions, and reducers`
- │ ├── services/ `# API service layer`
- │ ├── hooks/ `# Custom React hooks`
- │ ├── views/ `# Page components`
- │ ├── types/ `# TypeScript type definitions`
- │ ├── lib/ `# Utility functions`
- │ └── constants/ `# Application constants`
- └── public/ `# Static assets`
