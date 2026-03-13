import { ref } from 'vue';
import { boardApi } from '../api/boardApi';

export function useRealtimeBoard() {
  const rows = ref([]);
  const loading = ref(false);

  const reload = async (area, department) => {
    loading.value = true;
    try {
      const [wo, online] = await Promise.all([
        boardApi.getReadWo(area, department),
        boardApi.getOnline(area, department),
      ]);
      rows.value = [...(wo.data || []), ...(online.data || [])];
    } finally {
      loading.value = false;
    }
  };

  return { rows, loading, reload };
}
