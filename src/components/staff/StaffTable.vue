<template><table><tr><th>#</th><th>Job</th></tr><tr v-for="(r,i) in rows" :key="i"><td>{{ i+1 }}</td><td>{{ r.JOB_NUMBER || r.jobNumber || '-' }}</td></tr></table></template>
<script setup>defineProps({ rows: { type: Array, default: () => [] } });</script>
