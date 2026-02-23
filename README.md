# Enterprise SaaS Dashboard Application

## Overview

This project is a production-grade frontend-only SaaS dashboard application built as part of a frontend engineering assessment. The application simulates a real-world enterprise system including campaign management, job lifecycle processing, and performance monitoring — entirely within the frontend.

All data fetching, asynchronous delays, polling, failures, pagination, filtering, and mutations are simulated locally. No external APIs, backend services, or third-party data sources are used.

The primary goal of this project is to demonstrate production-level frontend architecture, clean separation of concerns, robust state management, and scalable UI structuring.

---

## Tech Stack

- React (Vite)
- TypeScript (Strict Mode Enabled)
- Tailwind CSS
- React Router
- Feature-Based Folder Architecture
- Local Mocked Data Layer
- Custom Service Abstraction Layer

---

## Architectural Approach

### 1. Feature-Based Folder Structure

The application follows a feature-based architecture instead of a type-based structure. Each feature encapsulates:

- Pages
- Components
- Services
- Types
- Store (where applicable)

Example:

```
features/
  campaigns/
    components/
    pages/
    services/
    types.ts
    store.ts
```

This ensures:

- Clear domain separation
- Better scalability
- Easier refactoring
- Reduced cross-module coupling

---

### 2. Single Source of Truth: URL-Driven State

Pagination, sorting, filtering, and search are driven by URL query parameters.

This approach ensures:

- Shareable URLs
- Refresh-safe state
- Predictable state transitions
- No duplicated state between UI and data layer

All updates to query parameters use functional updates to prevent stale state overwrites.

---

### 3. Service Layer Abstraction

All data interactions go through a dedicated service layer. UI components remain free from business logic.

Example responsibilities of service layer:

- Simulated API delays
- Controlled failure injection
- Pagination slicing
- Filtering and sorting logic
- Polling simulation
- Status mutation logic

This maintains strict separation between:

- Presentation Layer (UI)
- Domain Logic (Services)
- Data Simulation Layer (Mock DB)

---

### 4. Local Mocked Data Simulation

A local in-memory mock database simulates backend behavior.

Features include:

- Artificial latency using setTimeout
- Randomized failure simulation
- Controlled polling cycles
- Optimistic update rollback handling
- Simulated upload progress tracking

No external network calls are performed.

---

## Application Modules

---

### 1. Application Shell & Design System

The application includes:

- Sidebar layout
- Responsive dashboard layout
- Reusable UI components
- Error boundaries
- Loading states
- Consistent design tokens via Tailwind

The layout is built to simulate a scalable SaaS admin dashboard environment.

---

### 2. Campaign Management Module

The campaign table supports:

- Sortable columns
- Multi-filter panel
- Debounced search input
- URL-based pagination
- Bulk selection
- Inline status updates
- Optimistic UI updates
- Simulated async mutations
- Controlled error rollback

All mutations simulate network delays and error conditions to mimic production behavior.

Optimistic updates:

- UI updates immediately
- Service resolves asynchronously
- On failure, state rolls back safely

---

### 3. Campaign Detail Page

The detail page is structured with tab-based navigation.

#### Overview Tab
- Editable form
- Validation
- Unsaved changes detection
- Navigation guard simulation

#### Assets Tab
- Drag-and-drop upload simulation
- Artificial upload progress
- Success and failure states
- Confirmation modals
- File removal handling

#### Performance Tab
- Metrics visualization
- Loading states
- Empty states
- Simulated error states
- Clean separation between chart rendering and data fetching

---

### 4. Job Simulation Engine

A frontend-only job lifecycle simulation was implemented.

Job states:
Pending → Processing → Completed / Failed

Features:

- Polling abstraction inside service layer
- Simulated status transitions
- Controlled interval-based updates
- UI remains unaware of polling mechanics
- Clean cancellation handling on unmount

The polling mechanism is encapsulated to prevent memory leaks and ensure predictable state updates.

---

### 5. Global State Strategy

State is divided into:

- URL state (filters, pagination, sorting)
- Feature-local UI state (selection, form edits)
- Service-level simulation state

No unnecessary global state libraries were introduced to avoid overengineering.

The architecture favors explicit data flow and predictable rendering behavior.

---

### 6. Edge Case Handling

The application handles:

- Loading states
- Empty states
- Simulated network failures
- Optimistic update rollback
- Unsaved form changes
- Polling cleanup
- Pagination boundary handling
- Disabled UI during async operations

Special care was taken to avoid:

- Double fetch loops
- Stale closures
- URL-state desynchronization
- Uncontrolled re-renders

---

### 7. Performance Considerations

Performance optimizations include:

- useCallback for handler stability
- Functional URL state updates
- Avoidance of derived state duplication
- Controlled effect dependencies
- Optimistic UI to reduce perceived latency
- Service abstraction to avoid repeated logic

The application avoids unnecessary re-renders by maintaining a clear separation of concerns and predictable dependency arrays.

---

## Data Simulation Design

The data layer simulates real backend behavior by:

- Applying filtering and sorting on mock arrays
- Slicing results for pagination
- Injecting artificial latency
- Randomizing failures based on configurable conditions
- Handling polling through interval-based lifecycle transitions

All simulation logic is isolated from UI components.

---

## Development Approach

This project was structured to resemble a real enterprise frontend system rather than a demo application.

Key goals:

- Production-grade architecture
- Maintainable structure
- Clear separation of responsibilities
- Scalable module boundaries
- Realistic async simulation
- Robust state handling

---

## Setup Instructions

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Run development server:

```
npm run dev
```

4. Build production bundle:

```
npm run build
```

---

## Deployment

The application can be deployed using:

- Vercel
- Netlify
- Any static hosting provider

Since the entire application is frontend-only, no backend configuration is required.

---

## Summary

This application demonstrates:

- Production-level frontend architecture
- Clean service abstraction
- Frontend-only async simulation
- URL-driven state management
- Optimistic UI patterns
- Polling abstraction
- Edge case discipline
- Scalable feature-based structuring

The focus of this project was not only feature implementation but architectural clarity, separation of concerns, and production-oriented thinking.
