# newbord (Vue 3 migration from `19board.html`)

This repository migrates the legacy single-file page (`19board.html`) into a Vue 3 modular architecture while preserving legacy API contracts and business behavior.

## Requirements
- Node.js 18+
- npm 9+

## Run locally
```bash
npm install
npm run dev
```

Default dev URL (Vite): `http://localhost:5173`

## Production build
```bash
npm run build
npm run preview
```

## Project structure and migrated modules

### Realtime production board
- View: `src/views/RealtimeBoardView.vue`
- Components: `src/components/board/*`
- Logic: `src/composables/useRealtimeBoard.js`
- API: `src/api/boardApi.js`

### Work order management
- View: `src/views/WorkOrderManageView.vue`
- Components: `src/components/workorder/*`
- Logic: `src/composables/useWorkOrderManage.js`
- API: `src/api/workOrderApi.js`

### Staff management
- View: `src/views/StaffManageView.vue`
- Components: `src/components/staff/*`
- Logic: `src/composables/useStaffManage.js`
- API: `src/api/staffApi.js`

### FQC / completion quantity
- View: `src/views/FqcManageView.vue`
- Components: `src/components/fqc/*`
- Logic: `src/composables/useFqcManage.js`
- API: `src/api/fqcApi.js`

### Shared app shell and i18n
- App shell/router: `src/App.vue`, `src/router/index.js`
- Language composable: `src/composables/useLanguage.js`
- Locale dictionaries: `src/locales/*`
- Shared/common components: `src/components/common/*`

## API contract policy
- API route paths are preserved from the legacy file.
- Request payload field names are preserved for migrated flows.
- Central HTTP config: `src/api/http.js`.

## Migration documentation
- Mapping, checklist, parity notes, and TODO backlog: `MIGRATION_NOTES.md`.
