<template>
  <section>
    <h2>完工數量</h2>
    <div class="toolbar">
      <label>Area <select v-model="selectedArea" @change="refresh"><option>ZH</option><option>TC</option><option>VN</option><option>TW</option></select></label>
      <label>D <select v-model="selectedD" @change="refresh"><option v-for="n in ['1','2','3','4','6']" :key="n">{{ n }}</option></select></label>
      <label>S <select v-model="selectedS" @change="refresh"><option v-for="n in ['1','2','3']" :key="n">{{ n }}</option></select></label>
      <label>C <select v-model="selectedC" @change="refresh"><option v-for="n in ['1','2','3','4','5','6','7','8','9','10','11','12','13','S1','S2','S3','S4','S5','S6']" :key="n">{{ n }}</option></select></label>
      <label>L <select v-model="selectedL" @change="refresh"><option value=""></option><option v-for="n in ['1','2','3','4','5','6','7']" :key="n">{{ n }}</option></select></label>
      <span>Department: {{ selectedDepartment }}</span>
    </div>

    <FqcCompleteTable :rows="realTimeData" @validate="validateInput" @complete="completeWorkOrder" />
    <button style="float:right" @click="updateAllRatings">提交</button>
    <RatingTable :rows="ratingRows" :total="calculateTotalCompletedQty" @update-one="updateRatingDate" />
  </section>
</template>

<script setup>
import FqcCompleteTable from '../components/fqc/FqcCompleteTable.vue';
import RatingTable from '../components/fqc/RatingTable.vue';
import { useFqcManage } from '../composables/useFqcManage';

const {
  selectedArea, selectedD, selectedS, selectedC, selectedL, selectedDepartment,
  realTimeData, ratingRows, fetchData, fetchRatings,
  calculateTotalCompletedQty, validateInput,
  completeWorkOrder, updateAllRatings, updateRatingDate,
} = useFqcManage();

const refresh = async () => {
  await fetchData();
  await fetchRatings();
};
</script>
