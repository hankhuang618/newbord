# Migration Notes (`19board.html` -> Vue 3)

## Module mapping
- Realtime production board -> `src/views/RealtimeBoardView.vue`, `src/components/board/*`, `src/composables/useRealtimeBoard.js`
- Work order management -> `src/views/WorkOrderManageView.vue`, `src/components/workorder/*`, `src/composables/useWorkOrderManage.js`
- Staff management -> `src/views/StaffManageView.vue`, `src/components/staff/*`, `src/composables/useStaffManage.js`
- FQC / rating -> `src/views/FqcManageView.vue`, `src/components/fqc/*`, `src/composables/useFqcManage.js`
- Language switching -> `src/composables/useLanguage.js`, `src/locales/*`, `src/components/common/LanguageSwitcher.vue`

## API extraction
- HTTP client: `src/api/http.js`
- Realtime board endpoints: `src/api/boardApi.js`
- Work order endpoints: `src/api/workOrderApi.js`
- Staff endpoints: `src/api/staffApi.js`
- FQC endpoints: `src/api/fqcApi.js`

All routes listed in the API service modules keep the original path strings from `19board.html`.

## TODO (legacy-behavior preservation backlog)
- [ ] Port all remaining API integrations not yet surfaced by the four module service files (reference: `19board.html` axios/fetch calls around lines 2180-8123).
- [ ] Port all modal flows and table cell interactions with legacy validation and confirmations.
- [ ] Port report export flows (Excel/PDF/print) while preserving payload schemas.
- [ ] Port advanced summary/table merge logic and monthly performance calculations.
- [ ] Add parity checks for watcher/computed behavior from the legacy Vue2 instance.

## Checklist
- [x] Vue 3 scaffold and runnable app
- [x] Router-based views by major feature area
- [x] API modules created under `/src/api`
- [x] Shared components/composables/utils folders created
- [x] Styles split into base/layout/page files
- [x] README startup instructions
- [x] Migration notes + TODO backlog
