import { computed, onMounted, ref } from 'vue';
import { fqcApi } from '../api/fqcApi';

const getDepartment = (d, s, c, l) => (l ? `${d}D${s}S${c}-${l}C` : `${d}D${s}S${c}C`);

export function useFqcManage() {
  const selectedArea = ref('VN');
  const selectedD = ref('1');
  const selectedS = ref('1');
  const selectedC = ref('1');
  const selectedL = ref('');

  const realTimeData = ref([]);
  const ratingRows = ref([]);

  const selectedDepartment = computed(() =>
    getDepartment(selectedD.value, selectedS.value, selectedC.value, selectedL.value),
  );

  const fetchData = async () => {
    const { data } = await fqcApi.getReadWo(selectedArea.value, selectedDepartment.value);
    realTimeData.value = (data || []).map((item) => ({ ...item, inputError: false, inputError2: false }));
  };

  const fetchRatings = async () => {
    const { data } = await fqcApi.getRating(selectedArea.value, selectedDepartment.value);
    ratingRows.value = (data?.result || []).map((item) => ({ ...item, inputError: false, inputError2: false }));
  };

  const calculateTotalCompletedQty = (item) => {
    const total = (parseFloat(item.COMPLETED_QTY_1) || 0)
      + (parseFloat(item.COMPLETED_QTY_2) || 0)
      + (parseFloat(item.COMPLETED_QTY_3) || 0)
      + (parseFloat(item.COMPLETED_QTY_4) || 0)
      + (parseFloat(item.COMPLETED_QTY_5) || 0);
    return total.toFixed(0);
  };

  const validateInput = (item) => {
    if (Number(item.FQC) < Number(item.OLDFQC)) {
      item.inputError = true;
      item.FQC = item.OLDFQC;
    } else if (Number(item.FQC) > Number(item.qty)) {
      item.inputError2 = true;
      item.FQC = item.OLDFQC;
    } else {
      item.inputError = false;
      item.inputError2 = false;
    }
  };

  const completeWorkOrder = async (woId, fqc) => {
    await fqcApi.completeWorkOrder({
      wO_ID: woId,
      fqc: String(fqc),
      department: selectedDepartment.value,
      area: selectedArea.value,
    });
    alert('更新完成');
  };

  const updateAllRatings = async () => {
    const payload = ratingRows.value.map((item) => ({
      area: selectedArea.value,
      qty1: item.COMPLETED_QTY_1,
      qty2: item.COMPLETED_QTY_2,
      qty3: item.COMPLETED_QTY_3,
      qty4: item.COMPLETED_QTY_4,
      qty5: item.COMPLETED_QTY_5,
      toqty: calculateTotalCompletedQty(item),
      ID: String(item.id),
    }));
    const { data } = await fqcApi.updateAllRating(payload);
    alert(data);
    await fetchData();
    await fetchRatings();
  };

  const updateRatingDate = async (item) => {
    const { data } = await fqcApi.updateRating({
      area: selectedArea.value,
      qty1: item.COMPLETED_QTY_1,
      qty2: item.COMPLETED_QTY_2,
      qty3: item.COMPLETED_QTY_3,
      qty4: item.COMPLETED_QTY_4,
      qty5: item.COMPLETED_QTY_5,
      toqty: calculateTotalCompletedQty(item),
      id: String(item.id),
    });
    alert(data);
    await fetchData();
    await fetchRatings();
  };

  onMounted(async () => {
    await fetchData();
    await fetchRatings();
  });

  return {
    selectedArea, selectedD, selectedS, selectedC, selectedL, selectedDepartment,
    realTimeData, ratingRows,
    fetchData, fetchRatings,
    calculateTotalCompletedQty, validateInput,
    completeWorkOrder, updateAllRatings, updateRatingDate,
  };
}
