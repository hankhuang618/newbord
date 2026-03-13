<template>
  <BaseModal :open="open">
    <h3>調整復工日期</h3>
    <input type="date" :value="date" @input="$emit('update:date', $event.target.value)" />
    <div class="toolbar">
      <button @click="$emit('cancel')">取消</button>
      <button @click="$emit('confirm')">更新</button>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../common/BaseModal.vue';
defineProps({ open: Boolean, date: String });
defineEmits(['confirm', 'cancel', 'update:date']);
</script>
