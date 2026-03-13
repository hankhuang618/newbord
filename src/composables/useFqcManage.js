import { ref } from 'vue';
import { fqcApi } from '../api/fqcApi';

export function useFqcManage() {
  const ratingRows = ref([]);
  const fetchRatings = async (area, department) => {
    const { data } = await fqcApi.getRating(area, department);
    ratingRows.value = data || [];
  };
  return { ratingRows, fetchRatings };
}
