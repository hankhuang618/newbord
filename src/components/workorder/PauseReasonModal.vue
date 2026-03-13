<template>
  <BaseModal :open="open">
    <h3>請選擇暫停原因</h3>
    <select :value="remark" @change="$emit('update:remark', $event.target.value)">
      <option disabled value="">請選擇</option>
      <option v-for="item in remarks" :key="item" :value="item">{{ item }}</option>
    </select>
    <div class="toolbar">
      <button @click="$emit('cancel')">取消</button>
      <button @click="$emit('confirm')">確認暫停</button>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../common/BaseModal.vue';
defineProps({ open: Boolean, remarks: { type: Array, default: () => [] }, remark: { type: String, default: '' } });
defineEmits(['confirm', 'cancel', 'update:remark']);
</script>
