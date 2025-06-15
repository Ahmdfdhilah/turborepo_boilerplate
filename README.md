# Argabumi Frontends

A modern monorepo workspace built with Turborepo, Tailwind v4, and Shadcn/ui designed for Argabumi's frontend ecosystem.

## Architecture Overview

Our monorepo is organized into three main sections to optimize development workflow and code reusability:

### 1. Configuration Hub (`/config`)

Centralized configuration management for consistent development experiences:
- **ESLint** - Code quality standards across all projects
- **Prettier** - Consistent code formatting rules
- **Tailwind CSS** - Custom design system tokens and extensions
- **TypeScript** - Type definitions and compiler options

### 2. Shared Component Library (`/packages`)

Our reusable component ecosystem includes:
- **@workspace/ui** - Shadcn/ui component library customized for Argabumi's design language
- **@workspace/utils** - Shared utility functions and helpers
- **@workspace/hooks** - Custom React hooks collection

### 3. Applications (`/apps`)

Contains arga's frontend applications:
- **arga-daashboard** - Main Dashboard Applications
- **arga-company-profile** - Company Profile Website
- **arga-performance-management-system** - Performance management website

## Development Workflow

### Setup

We use [PNPM](https://pnpm.io/) as our package manager for efficient dependency management:

```bash
# Install all dependencies
pnpm install
```

### Working with Shadcn/ui Components

To add a new Shadcn/ui component to our shared library:

```bash
# Navigate to the UI package
cd ./packages/ui/

# Add a component (e.g., dialog, dropdown, etc.)
pnpx shadcn@latest add dialog
```

### Using Shared Components

Import components from our UI package in any application:

```tsx
import { Button } from "@workspace/ui/components/ui/button";
import { DatePicker } from "@workspace/ui/components/ui/basic-date-picker";
```

### Tailwind CSS

We use Tailwind CSS v4 with custom configurations to match Argabumi's design system. The base configuration extends from our design tokens and can be found in `/config/tailwind/`.

## Available Commands

### Development

```bash
# Run development server for all apps
pnpm run dev

# Run a specific app
pnpm run dev --filter=app
```

### Building

```bash
# Build all packages and apps
pnpm run build

# Build specific app
pnpm run build --filter=app
```

### Quality Control

```bash
# Type checking
pnpm run check-types

# Format code
pnpm run format

# Lint code
pnpm run lint
```

### Maintenance

```bash
# Update dependencies
pnpm run update

# Clean build artifacts
pnpm run clean
```

## CI/CD Pipeline

Our CI/CD pipeline is configured for:
- Pre-commit checks (linting, type checking)
- Build verification
- Deployment to dev, staging, and production environments

## Project Structure

```
argabumi-frontends/
├── apps/
│   ├── client/           # Main customer application
│   ├── admin/            # Admin dashboard
│   └── marketing/        # Marketing website
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Utility functions
│   └── hooks/            # Shared React hooks
├── config/
│   ├── eslint/           # ESLint configurations
│   ├── prettier/         # Prettier configurations
│   ├── tailwind/         # Tailwind CSS configurations
│   └── typescript/       # TypeScript configurations
└── turbo.json            # Turborepo configuration
```

## Getting Started

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server
4. Open your browser to see the running applications