# Team Portal

A Next.js 14 (App Router) based Team Portal dashboard for viewing team registrations. Built with Tailwind CSS, React Query, Zod validation, and Zustand state management.

## Features
- View registered teams from `/api/team` endpoint
- Search teams by name, university, or member details
- Responsive table layout with payment status indicators
- Type-safe runtime validation with Zod
- Optimized caching with React Query

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Data Fetching**: React Query (@tanstack/react-query)  
- **Validation**: Zod
- **State**: Zustand
- **UI Components**: Custom (shadcn/ui style)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
src/
  app/               # App router pages & layouts
    layout.tsx       # Root layout with providers
    page.tsx         # Homepage with navigation
    team/page.tsx    # Team directory page
  components/team/   # Team-related UI components
    Providers.tsx    # React Query provider wrapper
    TeamTable.tsx    # Main data table
    TeamRow.tsx      # Individual team row
    TeamFilters.tsx  # Search & filter controls
  lib/               # Core logic & data
    api/             # API client & fetch functions
    models/team.ts   # Zod schemas & TypeScript types
    hooks/           # React Query hooks
    state/           # Zustand stores
  utils/             # Helper functions
  styles/            # Global CSS with design tokens
```

## API Schema
Consumes team data from `NEXT_PUBLIC_API_BASE/team` with structure:
```typescript
{
  _id: string;
  teamName: string;
  university: string;
  payment?: { slip: string };
  members: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
  }>;
  createdAt: string;
  __v?: number;
}
```

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build production bundle
- `npm run start` – Start production server  
- `npm run lint` – Run ESLint

## Future Enhancements
1. **Filters**: University dropdown, date range picker
2. **Team Details**: Drawer/modal with full member info + payment slip view
3. **Stats Dashboard**: Team count, university breakdown, payment status charts
4. **Export**: CSV/PDF export functionality
5. **Virtualization**: Handle large datasets with `@tanstack/react-virtual`
6. **Auth**: Proxy route with authentication if required
7. **Tests**: Jest + RTL component tests, Playwright E2E

## Development Notes
- TypeScript errors will resolve after `npm install`
- Tailwind classes are validated during build process
- React Query provides automatic caching & background refetch
- Search filters teams, universities, and member names/emails
- Payment status badge shows "Paid" (green) or "Pending" (amber)

## License
Internal / Proprietary
