# URL Encoder Application

## Overview

This is a simple web application that provides URL encoding functionality with repetition support. It's built with React frontend and Express backend, featuring real-time URL encoding with the ability to display multiple copies of the encoded text. The application uses a modern stack with TypeScript, Tailwind CSS, and shadcn/ui components for a clean, simple user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with three main directories:
- `client/` - React frontend with Vite bundler
- `server/` - Express.js backend API
- `shared/` - Common TypeScript types and schemas

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query for server state, local state for UI
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL configured through Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

## Key Components

### URL Encoding Engine
The core functionality is implemented in `client/src/lib/encoding.ts`:
- **URL Encoding**: Uses `encodeURIComponent()` for proper URL encoding
- **Real-time Processing**: Instantly encodes text as user types
- **Repetition Support**: Allows users to generate multiple copies of encoded text

### User Interface Components
- **EncodingForm**: Simple text input and repetition count controls
- **EncodingPreview**: Real-time display of URL encoded results with copy functionality
- **QuickActions**: Utility buttons for clipboard operations, sample text, and download
- **EncodingExamples**: Educational examples of URL encoding characters

### Database Schema
Minimal user schema in `shared/schema.ts`:
- Users table with id, username, and password fields
- Drizzle ORM integration with Zod schema validation
- Type-safe database operations

## Data Flow

1. **Input Processing**: User enters text in the main form component
2. **Real-time Encoding**: Text is immediately encoded using the selected algorithm
3. **Result Display**: Encoded output is shown with metadata (length, size change)
4. **Repetition Feature**: Users can generate multiple copies of encoded text
5. **Clipboard Integration**: One-click copying of results to clipboard

The application processes encoding entirely on the client side for optimal performance and privacy.

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Build Tools**: Vite, TypeScript, ESBuild
- **UI Framework**: Radix UI primitives, Tailwind CSS, Class Variance Authority

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database driver
- **Server**: Express.js, TypeScript execution via tsx
- **Session Management**: Express sessions with PostgreSQL store

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Code Quality**: TypeScript strict mode, ESLint configuration
- **Database Tooling**: Drizzle Kit for schema management

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with HMR enabled
- **Database**: Development database via Neon's serverless PostgreSQL
- **Build Process**: TypeScript compilation with real-time error reporting

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public/`
- **Backend**: ESBuild compiles TypeScript server code to `dist/`
- **Static Serving**: Express serves built frontend assets in production
- **Database**: Production PostgreSQL database via environment variables

### Environment Configuration
- **Database URL**: Configured via `DATABASE_URL` environment variable
- **Session Management**: PostgreSQL-backed sessions for scalability
- **Static Assets**: Served efficiently through Express static middleware

The application is designed for easy deployment on platforms like Replit, with automatic environment detection and optimized build processes for both development and production scenarios.