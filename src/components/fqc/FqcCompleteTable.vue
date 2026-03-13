<template><table><tr><th>#</th><th>WO</th></tr><tr v-for="(r,i) in rows" :key="i"><td>{{ i+1 }}</td><td>{{ r.WO_ID || '-' }}</td></tr></table></template>
<script setup>defineProps({ rows: { type: Array, default: () => [] } });</script>
