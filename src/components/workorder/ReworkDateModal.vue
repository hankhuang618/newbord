<template><BaseModal :open="open"><h3>Rework Date</h3><slot /></BaseModal></template>
<script setup>import BaseModal from '../common/BaseModal.vue';defineProps({ open: Boolean });</script>
