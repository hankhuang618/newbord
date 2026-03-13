<template>
  <section>
    <h2>Work Order Manage</h2>
    <button @click="saveWorkOrder({ area: 'VN' })" :disabled="saving">Save</button>
    <WorkOrderTable :rows="[]" />
  </section>
</template>
<script setup>
import WorkOrderTable from '../components/workorder/WorkOrderTable.vue';
import { useWorkOrderManage } from '../composables/useWorkOrderManage';
const { saving, saveWorkOrder } = useWorkOrderManage();
</script>
