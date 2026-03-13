<template>
  <section>
    <h2>FQC Manage</h2>
    <button @click="fetchRatings('VN', 'SMD')">Query</button>
    <RatingTable :rows="ratingRows" />
  </section>
</template>
<script setup>
import RatingTable from '../components/fqc/RatingTable.vue';
import { useFqcManage } from '../composables/useFqcManage';
const { ratingRows, fetchRatings } = useFqcManage();
</script>
