<template>
  <form @submit.prevent="$emit('submit')" class="toolbar">
    <label>部門 <input :value="model.department" @input="$emit('update:model', { ...model, department: $event.target.value })" required /></label>
    <label>工號 <input :value="model.jobnumber" @input="$emit('update:model', { ...model, jobnumber: $event.target.value })" required /></label>
    <label>姓名 <input :value="model.username" @input="$emit('update:model', { ...model, username: $event.target.value })" required /></label>
    <label>工作拉 <input :value="model.work_department" @input="$emit('update:model', { ...model, work_department: $event.target.value })" /></label>
    <button type="submit">完成</button>
  </form>
</template>
<script setup>
defineProps({ model: { type: Object, required: true } });
defineEmits(['submit', 'update:model']);
</script>
