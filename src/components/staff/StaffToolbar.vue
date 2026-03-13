<template>
  <div class="toolbar">
    <button @click="$emit('new')">New</button>
    <button @click="$emit('delete-mode')">Delete</button>
    <button @click="$emit('edit-mode')">修改</button>
    <button @click="$emit('cancel')">取消</button>
    <slot />
  </div>
</template>
<script setup>
defineEmits(['new', 'delete-mode', 'edit-mode', 'cancel']);
</script>
