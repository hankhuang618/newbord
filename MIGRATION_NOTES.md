# Migration Notes (`19board.html` -> Vue 3)

## Legacy section -> Vue module mapping

### 1) Realtime production board
Legacy concerns:
- area/department filters
- online summary counters
- realtime work-order list
- station list

Mapped files:
- `src/views/RealtimeBoardView.vue`
- `src/components/board/SummaryCards.vue`
- `src/components/board/WorkOrderList.vue`
- `src/components/board/StationList.vue`
- `src/composables/useRealtimeBoard.js`
- `src/api/boardApi.js`

### 2) Work order management
Legacy concerns:
- work-order table actions (complete / pause / rework / rework-date adjust)
- ERP query/import flow
- modal flows for pause reason and rework date

Mapped files:
- `src/views/WorkOrderManageView.vue`
- `src/components/workorder/WorkOrderTable.vue`
- `src/components/workorder/ERPQueryPanel.vue`
- `src/components/workorder/PauseReasonModal.vue`
- `src/components/workorder/ReworkDateModal.vue`
- `src/composables/useWorkOrderManage.js`
- `src/api/workOrderApi.js`

### 3) Staff management
Legacy concerns:
- add/edit/delete staff
- show/hide toggle
- status update flow and HR cancellation

Mapped files:
- `src/views/StaffManageView.vue`
- `src/components/staff/StaffToolbar.vue`
- `src/components/staff/StaffForm.vue`
- `src/components/staff/StaffTable.vue`
- `src/composables/useStaffManage.js`
- `src/api/staffApi.js`

### 4) FQC / completion quantity
Legacy concerns:
- completion quantity entry and validation
- single completion submit
- per-row rating update
- bulk rating update

Mapped files:
- `src/views/FqcManageView.vue`
- `src/components/fqc/FqcCompleteTable.vue`
- `src/components/fqc/RatingTable.vue`
- `src/composables/useFqcManage.js`
- `src/api/fqcApi.js`

### 5) Language switching
Mapped files:
- `src/components/common/LanguageSwitcher.vue`
- `src/composables/useLanguage.js`
- `src/locales/zh-TW.js`
- `src/locales/en-US.js`
- `src/locales/vi-VN.js`

## API extraction summary
- Shared HTTP client: `src/api/http.js`
- Board APIs: `src/api/boardApi.js`
- Work-order APIs: `src/api/workOrderApi.js`
- Staff APIs: `src/api/staffApi.js`
- FQC APIs: `src/api/fqcApi.js`

All API paths in these modules are kept as legacy endpoint strings.

## Parity checklist
- [x] Vue 3 app scaffold and router
- [x] Core feature-group views exist (Realtime/WorkOrder/Staff/FQC)
- [x] API modules extracted under `src/api`
- [x] Major tables, modals, filters, and action handlers represented in module structure
- [x] Multilingual resources and switcher module exist
- [x] README startup instructions and module map
- [x] Migration notes map legacy sections to new files

## TODO (explicit non-silent backlog)
- [ ] Complete full string-level i18n parity for all legacy labels/messages.
- [ ] Port remaining legacy report/export workflows (Excel/PDF/print).
- [ ] Port remaining legacy watcher/computed edge cases not yet represented in composables.
- [ ] Add automated parity tests for critical API payload/response handling.
