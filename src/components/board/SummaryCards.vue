<template><div class="cards"><div class="card">Rows: {{ rows.length }}</div></div></template>
<script setup>defineProps({ rows: { type: Array, default: () => [] } });</script>
