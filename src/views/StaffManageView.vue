<template>
  <section>
    <h2>Staff Manage</h2>
    <button @click="fetchAttendance(today, '')">Query</button>
    <StaffTable :rows="list" />
  </section>
</template>
<script setup>
import { ref } from 'vue';
import StaffTable from '../components/staff/StaffTable.vue';
import { useStaffManage } from '../composables/useStaffManage';
import { formatDate } from '../utils/format';
const { list, fetchAttendance } = useStaffManage();
const today = ref(formatDate(new Date()));
</script>
