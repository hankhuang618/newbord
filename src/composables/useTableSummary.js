import { computed } from 'vue';

export function useTableSummary(rowsRef, key) {
  const total = computed(() => (rowsRef.value || []).reduce((sum, row) => sum + Number(row[key] || 0), 0));
  return { total };
}
