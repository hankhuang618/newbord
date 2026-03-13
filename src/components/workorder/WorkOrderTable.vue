<template>
  <table>
    <caption>工單列表</caption>
    <thead>
      <tr>
        <th>ID</th><th>工單</th><th>品名</th><th>數量</th><th>標準工時</th><th>過往效率</th><th>功能</th><th>日期</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in rows" :key="`${item.WO_ID}-${index}`">
        <tr v-if="showLeadCell(index) && item.Trans_id !== 'LOT_PAUSE'">
          <td :rowspan="getRowSpan(index)" :style="bg(item.NFC_CODE)">{{ item.NFC_CODE }}</td>
          <td>{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>近一年無生產</td>
          <td :rowspan="getRowSpan(index)">
            <button @click="$emit('complete', item.WO_ID, item.NFC_CODE)">完成</button>
            <button @click="$emit('pause', item.WO_ID, item.NFC_CODE)">暫停</button>
          </td>
          <td></td>
        </tr>

        <tr v-else-if="showLeadCell(index) && item.Trans_id === 'LOT_PAUSE'">
          <td>{{ item.NFC_CODE }}</td>
          <td>{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>近一年無生產</td>
          <td><button :disabled="isButtonDisabled" @click="$emit('rework', item)">復工</button></td>
          <td>{{ item.rework_date }} <button :disabled="isButtonDisabled" @click="$emit('adjust-date', item.ID)">調整</button></td>
        </tr>

        <tr v-else-if="!showLeadCell(index) && item.Trans_id !== 'LOT_PAUSE'">
          <td>{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>N/A</td>
          <td></td>
          <td></td>
        </tr>

        <tr v-else>
          <td>{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>近一年無生產</td>
          <td><button :disabled="isButtonDisabled" @click="$emit('rework', item)">復工</button></td>
          <td></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  rows: { type: Array, default: () => [] },
  getRowSpan: { type: Function, required: true },
  showLeadCell: { type: Function, required: true },
  isButtonDisabled: { type: Boolean, default: false },
});
defineEmits(['complete', 'pause', 'rework', 'adjust-date']);

const bg = (nfcCode) => ({
  backgroundColor:
    nfcCode === '01' ? '#4886ea' :
      nfcCode === '02' ? 'darkgreen' :
        nfcCode === '03' ? 'yellow' :
          nfcCode === '04' ? '#bd91f3' :
            nfcCode === '05' ? 'lightgreen' :
              nfcCode === '06' ? 'orange' : '',
});
</script>
