<template>
  <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option value="zh-TW">繁中</option><option value="en-US">EN</option><option value="vi-VN">VI</option>
  </select>
</template>
<script setup>defineProps({ modelValue: String });defineEmits(['update:modelValue']);</script>
