<template><div v-if="open" class="modal"><div class="panel"><slot /></div></div></template>
<script setup>defineProps({ open: Boolean });</script>
