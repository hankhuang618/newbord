<template>
  <table>
    <thead>
      <tr><th>工單</th><th>品名</th><th>數量</th><th>標準工時</th><th>執行工時</th><th>已完成數量</th><th>功能</th></tr>
    </thead>
    <tbody>
      <tr v-for="item in rows" :key="item.WO_ID" v-if="item.Trans_id !== 'LOT_PAUSE'">
        <td>{{ item.WO_ID }}</td><td>{{ item.PART_DESC }}</td><td>{{ item.qty }}</td><td>{{ item.std }}</td>
        <td v-if="item.time > 0">{{ Number(item.time).toFixed(2) }}</td><td v-else>未生產</td>
        <td>
          <input type="number" v-model="item.FQC" @change="$emit('validate', item)" />
          <br><span v-if="item.inputError" style="color:red;">不可小於舊值</span><span v-if="item.inputError2" style="color:red;">不可大於工單數量</span>
        </td>
        <td><button @click="$emit('complete', item.WO_ID, item.FQC)">提交</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
defineProps({ rows: { type: Array, default: () => [] } });
defineEmits(['validate', 'complete']);
</script>
