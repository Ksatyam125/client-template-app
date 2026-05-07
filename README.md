# Client Template Dashboard

## Project Overview

This project is a responsive client/template dashboard application built with modern full-stack web technologies. It includes secure user authentication, protected dashboard routes, template and client management sections, and production deployment.

## Git Repository Link

**Repository:** https://github.com/ksatyam125/client-template-app
**Live Deployment:** https://client-template-app.vercel.app

## Tech Used

### Frontend

* Next.js 14 (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend / Authentication

* Supabase Authentication
* Supabase Database
* Server Actions / Route Handlers

### Deployment

* Vercel

## Installation & Local Setup

### 1. Clone Repository

```bash id="k8f3jd"
git clone https://github.com/ksatyam125/client-template-app.git
cd client-template-app
```

### 2. Install Dependencies

```bash id="f9d3ks"
npm install
```

### 3. Create `.env.local`

```env id="d83ks1"
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash id="x92ks8"
npm run dev
```

## Core Features

* User Signup
* User Login
* Secure Logout
* Protected Dashboard
* Template Management Section
* Client Management Section
* Mobile Responsive Design
* Production Deployment via Vercel

## Data Model Walkthrough

### Authentication

Managed by Supabase Auth.

### Application Entities

* Templates
* Clients

### Relationships

* One authenticated user can manage multiple templates
* One authenticated user can manage multiple clients

## Architecture Decisions

### Why Next.js App Router?

* File-based routing
* Server components support
* Easy deployment on Vercel
* Scalable project structure

### Why Supabase?

* Fast authentication setup
* Secure session handling
* Easy environment variable integration
* Suitable for startup MVP development

### Why Tailwind CSS?

* Rapid UI development
* Responsive design by default

## Improvements With More Time

* Better homepage / landing page
* Password reset flow
* User role management
* Improved UI polish and accessibility
