<template><ul><li v-for="(r,i) in rows" :key="i">{{ r.WO_ID || r.woId || '-' }}</li></ul></template>
<script setup>defineProps({ rows: { type: Array, default: () => [] } });</script>
