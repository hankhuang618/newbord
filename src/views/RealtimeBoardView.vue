<template>
  <section>
    <h2>Realtime Board</h2>
    <button @click="reload(area, department)">Reload</button>
    <SummaryCards :rows="rows" />
    <RealtimeTable :rows="rows" />
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import SummaryCards from '../components/board/SummaryCards.vue';
import RealtimeTable from '../components/board/RealtimeTable.vue';
import { useRealtimeBoard } from '../composables/useRealtimeBoard';
import { DEFAULT_AREA, DEFAULT_DEPARTMENT } from '../utils/constants';

const { rows, reload } = useRealtimeBoard();
const area = ref(DEFAULT_AREA);
const department = ref(DEFAULT_DEPARTMENT);
onMounted(() => reload(area.value, department.value));
</script>
