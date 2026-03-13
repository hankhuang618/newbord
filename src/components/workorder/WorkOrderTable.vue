<template><textarea :value="JSON.stringify(rows, null, 2)" rows="8" readonly /></template>
<script setup>defineProps({ rows: { type: Array, default: () => [] } });</script>
