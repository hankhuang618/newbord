<template>
  <section>
    <h2>人員管理</h2>
    <div class="toolbar">
      <label>Area <select v-model="selectedArea" @change="staffDataFetch"><option>ZH</option><option>TC</option><option>VN</option><option>TW</option></select></label>
      <label>D <select v-model="selectedD" @change="staffDataFetch"><option v-for="n in ['1','2','3','4','6']" :key="n">{{ n }}</option></select></label>
      <label>S <select v-model="selectedS" @change="staffDataFetch"><option v-for="n in ['1','2','3']" :key="n">{{ n }}</option></select></label>
      <label>C <select v-model="selectedC" @change="staffDataFetch"><option v-for="n in ['1','2','3','4','5','6','7','8','9','10','11','12','13','S1','S2','S3','S4','S5','S6']" :key="n">{{ n }}</option></select></label>
      <label>L <select v-model="selectedL" @change="staffDataFetch"><option value=""></option><option v-for="n in ['1','2','3','4','5','6','7']" :key="n">{{ n }}</option></select></label>
      <span>Department: {{ selectedDepartment }}</span>
    </div>

    <StaffToolbar @new="newStaffMode" @delete-mode="showDelete" @edit-mode="showUpdate" @cancel="cancelMode" />
    <StaffForm v-if="showForm" :model="newStaff" @update:model="Object.assign(newStaff, $event)" @submit="addNewStaff" />
    <StaffTable
      :rows="staffData"
      :show-actions="showActions"
      @toggle-status="toggleStatus"
      @status="updateStatus"
      @delete-hr="deleteHr"
      @update-user="updateStaffData"
      @delete-user="deleteStaffData"
    />
  </section>
</template>

<script setup>
import StaffForm from '../components/staff/StaffForm.vue';
import StaffTable from '../components/staff/StaffTable.vue';
import StaffToolbar from '../components/staff/StaffToolbar.vue';
import { useStaffManage } from '../composables/useStaffManage';

const {
  selectedArea, selectedD, selectedS, selectedC, selectedL, selectedDepartment,
  staffData, showActions, showForm, newStaff,
  staffDataFetch, newStaffMode, showDelete, showUpdate, cancelMode, addNewStaff,
  toggleStatus, deleteStaffData, updateStaffData, deleteHr, updateStatus,
} = useStaffManage();
</script>
