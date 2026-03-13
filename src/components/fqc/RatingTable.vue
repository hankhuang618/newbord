<template>
  <table>
    <thead>
      <tr><th>日期</th><th>工號</th><th>姓名</th><th>工站</th><th>執行工時/H</th><th>08-10</th><th>10-12</th><th>13-15</th><th>15-17</th><th>17-20</th><th>已完成數量</th><th>功能</th></tr>
    </thead>
    <tbody>
      <tr v-for="item in rows" :key="item.id">
        <td>{{ item.MFG_DAY }}</td><td>{{ item.JOB_NUMBER }}</td><td>{{ item.USER_NAME }}</td><td>{{ item.WORK_CONTENT }}</td><td>{{ item.DATE_MINUTE }}</td>
        <td><input type="number" v-model="item.COMPLETED_QTY_1" class="short-input" /></td>
        <td><input type="number" v-model="item.COMPLETED_QTY_2" class="short-input" /></td>
        <td><input type="number" v-model="item.COMPLETED_QTY_3" class="short-input" /></td>
        <td><input type="number" v-model="item.COMPLETED_QTY_4" class="short-input" /></td>
        <td><input type="number" v-model="item.COMPLETED_QTY_5" class="short-input" /></td>
        <td>{{ total(item) }}</td>
        <td><button @click="$emit('update-one', item)">提交</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
defineProps({ rows: { type: Array, default: () => [] }, total: { type: Function, required: true } });
defineEmits(['update-one']);
</script>
