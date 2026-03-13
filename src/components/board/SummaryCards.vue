<template>
  <div class="cards">
    <div v-if="!onlineData.length" class="card">在線人數: 0</div>
    <template v-for="(item, idx) in onlineData" :key="idx">
      <div class="card">應出席人數: {{ item['應出席人數'] ?? 0 }}</div>
      <div class="card">實際出席人數: {{ item['實際出席'] ?? 0 }}</div>
      <div class="card">請假人數: {{ item['請假人數'] ?? 0 }}</div>
      <div class="card">流水線在線人數: {{ item['在線人數'] ?? 0 }}</div>
    </template>
    <div v-if="effOver" class="card" :class="{ danger: Number(effOver.EFF) < 90 }">本月效率: {{ pct(effOver.EFF) }}%</div>
    <div v-if="effOver" class="card" :class="{ danger: Number(effOver.OVERQ) > 2 }">本月溢領: {{ pct(effOver.OVERQ) }}%</div>
    <div v-if="effOver" class="card">未結工單: {{ Number(effOver.WOCOUNT || 0) }}</div>
    <div v-if="effOver" class="card" :class="{ danger: Number(effOver.WO6COUNT) > 0 }">逾期工單: {{ Number(effOver.WO6COUNT || 0) }}</div>
  </div>
</template>

<script setup>
defineProps({
  onlineData: { type: Array, default: () => [] },
  effOver: { type: Object, default: null },
});

const pct = (v) => {
  const n = Number(v);
  return Number.isNaN(n) ? '0.00' : n.toFixed(2);
};
</script>
