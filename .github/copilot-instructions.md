# Sanita Ticket - Copilot Instructions

## Project Overview

Electron desktop application for managing purchase tickets at Sanita. Reads legacy Access (MDB) databases and creates modern purchase receipts with Supabase backend persistence.

**Tech Stack**: Electron 22 + React + TypeScript + Supabase + MUI Joy + Zustand + Formik

## Architecture

### Electron Structure

- **Main process** ([src/main/main.ts](src/main/main.ts)): Bootstrap, IPC handlers, auto-updater
- **Renderer process** ([src/renderer/](src/renderer/)): React app with routing
- **Preload script** ([src/main/preload.ts](src/main/preload.ts)): Secure IPC bridge via `window.electron.app.*`

### Data Layer Pattern

APIs are class-based wrappers around Supabase client:

```typescript
// Create API instances via custom hooks
const ticketsApi = useTicketsApi();
const productsApi = useProductsApi();
```

All API classes follow this pattern (see [src/renderer/apis/](src/renderer/apis/)):

```typescript
export class TicketsAPI {
  constructor(private supabase: SupabaseClient) {}
  async findTickets(filters: ITicketFilters): Promise<IHistoryItem[]> {
    /* ... */
  }
}
```

### State Management

- **Global state**: React Context providers in [src/renderer/providers/](src/renderer/providers/)
  - `AppStateProvider`: Auth, current user/ticket, device info
  - `ConfigStateProvider`: Supabase credentials from main process
  - `StoreProvider`: Zustand stores registry
- **Feature state**: Zustand stores ([src/renderer/stores/](src/renderer/stores/))
  - Example: `ProductsStore` manages products list, filters, pagination
  - Access via `useProductsStore()` selector hook
- **View state**: Dedicated providers (e.g., `HomeStateProvider`, `HistoryStateProvider`)

### Routing & Views

React Router with route-based code splitting:

- `/` → Home view (ticket creation)
- `/history` → Ticket history with filters/search
- `/products` → Product management
- All protected routes require authentication (see [src/renderer/App.tsx](src/renderer/App.tsx))

## Development Workflows

### Environment Setup

1. Create `.env` file with:
   ```
   SUPABASE_URL=http://localhost:54321
   SUPABASE_ANON_KEY=<your-anon-key>
   ```
2. Run `npm install` (auto-runs postinstall hooks)
3. Local Supabase: `npx supabase start` (requires Docker)

### Running the App

- **Development**: `npm start` → Starts renderer with HMR (loads .env via dotenv-cli)
- **Main process**: Auto-reloads via electronmon when [src/main/](src/main/) changes
- **Production build**: `npm run package` → Outputs to `release/build/`

### Database Operations

- **Migrations**: `npm run migrate` → Backs up DB, runs Supabase migrations
- **Backup/Restore**: Docker Compose services (see [docker-compose.yml](docker-compose.yml))
  - `docker compose up backup` → Exports to [backup/](backup/)
  - Scripts in [scripts/](scripts/) manage PostgreSQL dumps

### Key Scripts

- `scripts/import-mdb.js`: Import legacy Access databases (uses mdb-reader)
- `scripts/update-version.js`: Bump version in package.json and main.ts
- `scripts/reset-password.js`: Admin password reset utility

## Code Conventions

### UI & Styling

- **Component library**: MUI Joy (`@mui/joy`) - NOT Material-UI
  - Custom theme in [src/renderer/theme.tsx](src/renderer/theme.tsx)
  - Type augmentations for custom variants in [src/types/index.ts](src/types/index.ts)
- **Language**: All UI text in Spanish
- **Forms**: Use Formik + Yup schemas (see [src/renderer/components/Forms/](src/renderer/components/Forms/))

### TypeScript Types

- Centralized in [src/types/](src/types/) with barrel export
- Domain types: `tickets.ts`, `products.ts`, `auth.ts`, `history.ts`
- Common patterns: `IDbProduct` (DB schema), `IProduct` (app domain)

### Error Handling

- Sentry integration in renderer ([src/renderer/libs/sentry.ts](src/renderer/libs/sentry.ts))
- electron-log for main process logging
- API errors bubble up from Supabase client - handle in calling component

### Custom Hooks

Key patterns in [src/renderer/hooks/](src/renderer/hooks/):

- `useLoader()`: Global loading state with `waitFor(promise)` utility
- `useAsync()`: Fetch data on mount
- `useSupabase()`: Singleton Supabase client (credentials from ConfigStateProvider)
- API hooks: `useTicketsApi()`, `useProductsApi()`, etc.

## Critical Conventions

### IPC Communication

Main ↔ Renderer via typed handlers in preload:

```typescript
// Main: ipcMain.handle('get-config', ...)
// Renderer: window.electron.app.getConfig()
```

Type definitions: [src/renderer/preload.d.ts](src/renderer/preload.d.ts)

### Environment Variables

- Webpack injects `process.env.*` in renderer at build time ([.erb/configs/webpack.config.base.ts](.erb/configs/webpack.config.base.ts))
- Main process reads from `prod.env` in production build
- Never commit `.env` files (use `.env.example` for templates)

### Build Configuration

- electron-builder config in [package.json](package.json) `build` section
- Windows target: NSIS installer (ia32 architecture)
- Auto-update: GitHub releases via `electron-updater`
- Output: `release/build/SanitaTicket Setup X.X.X.exe`

### Supabase Integration

- Local dev: [supabase/](supabase/) directory for migrations/config
- Migrations naming: `YYYYMMDDHHMMSS_description.sql`
- RLS policies required for all tables (see examples in [supabase/migrations/](supabase/migrations/))

## Common Patterns

### Adding a New Feature View

1. Create view in `src/renderer/views/FeatureName/`
2. Add route in [src/renderer/App.tsx](src/renderer/App.tsx)
3. If complex state: Create `FeatureStateProvider` and wrap route
4. If needs backend: Create API class and hook in `useSupabase.ts`
5. If persists data: Add Zustand store in `src/renderer/stores/`

### Working with Tickets

- Ticket lifecycle: Created → Can be returned (partial/full)
- Return tickets reference original via `return_ticket_id`
- History items aggregate ticket data with computed fields (see `toHistoryItem()` in [src/utils.ts](src/utils.ts))

### Device Management

- Each install tracked by machine ID (`node-machine-id`)
- Device name customizable by user
- Device info available via `useAppState().deviceInfo`

## References

- Based on Electron React Boilerplate: https://github.com/electron-react-boilerplate/electron-react-boilerplate
- Supabase JS docs: https://supabase.com/docs/reference/javascript
- MUI Joy UI: https://mui.com/joy-ui/getting-started/
