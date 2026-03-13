import { ref } from 'vue';
import { workOrderApi } from '../api/workOrderApi';

export function useWorkOrderManage() {
  const saving = ref(false);
  const saveWorkOrder = async (payload) => {
    saving.value = true;
    try {
      await workOrderApi.updateWorkOrder(payload);
    } finally {
      saving.value = false;
    }
  };
  return { saving, saveWorkOrder };
}
