<template>
  <section>
    <h2>Realtime Board</h2>
    <div class="toolbar">
      <label>Area <select v-model="selectedArea" @change="onFilterChange"><option>ZH</option><option>TC</option><option>VN</option><option>TW</option></select></label>
      <label>D <select v-model="selectedD" @change="onFilterChange"><option v-for="n in ['1','2','3','4','6']" :key="n">{{ n }}</option></select></label>
      <label>S <select v-model="selectedS" @change="onFilterChange"><option v-for="n in ['1','2','3']" :key="n">{{ n }}</option></select></label>
      <label>C <select v-model="selectedC" @change="onFilterChange"><option v-for="n in ['1','2','3','4','5','6','7','8','9','10','11','12','13','S1','S2','S3','S4','S5','S6']" :key="n">{{ n }}</option></select></label>
      <label>L <select v-model="selectedL" @change="onFilterChange"><option value=""></option><option v-for="n in ['1','2','3','4','5','6','7']" :key="n">{{ n }}</option></select></label>
      <button @click="fetchData">Reload</button>
      <span>Department: {{ selectedDepartment }}</span>
      <span v-if="currentTime">{{ currentTime }}</span>
    </div>

    <SummaryCards :online-data="onlineData" :eff-over="effOver" />
    <WorkOrderList :rows="realTimeData" />
    <StationList :rows="stationRows" />
  </section>
</template>

<script setup>
import StationList from '../components/board/StationList.vue';
import SummaryCards from '../components/board/SummaryCards.vue';
import WorkOrderList from '../components/board/WorkOrderList.vue';
import { useRealtimeBoard } from '../composables/useRealtimeBoard';

const {
  selectedArea,
  selectedD,
  selectedS,
  selectedC,
  selectedL,
  selectedDepartment,
  realTimeData,
  stationRows,
  onlineData,
  effOver,
  currentTime,
  saveFilters,
  fetchData,
} = useRealtimeBoard();

const onFilterChange = async () => {
  saveFilters();
  await fetchData();
};
</script>
