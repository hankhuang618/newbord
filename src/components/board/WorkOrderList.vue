<template>
  <table>
    <caption>工單列表</caption>
    <thead>
      <tr>
        <th>ID</th><th>工單</th><th>品名</th><th>數量</th><th>標準工時</th><th>執行工時</th>
        <th>當前效率</th><th>過往效率</th><th>做線</th><th>焊接</th><th>成型</th><th>已完成數量</th><th>ERP入庫數量</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in rows" :key="`${item.WO_ID}-${index}`">
        <tr v-if="showLeadCell(rows, index) && item.Trans_id !== 'LOT_PAUSE'">
          <td :rowspan="getRowSpan(rows, index)" :style="bg(item.NFC_CODE)">{{ item.NFC_CODE }}</td>
          <td :style="bg(item.NFC_CODE)">{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.time) > 0">{{ Number(item.time).toFixed(2) }}</td>
          <td v-else>未生產</td>
          <td v-if="Number(item.FQC) > 0">{{ currentEff(item) }}%</td>
          <td v-else></td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>近一年無生產</td>
          <td v-if="index === 0" :rowspan="rows.length">{{ item.LINE }}</td>
          <td v-if="index === 0" :rowspan="rows.length">{{ item.WELD }}</td>
          <td v-if="index === 0" :rowspan="rows.length">{{ item.MD }}</td>
          <td v-if="Number(item.FQC) > 0">{{ item.FQC }}</td>
          <td v-else></td>
          <td v-if="Number(item.ship_qty) > 0">{{ item.ship_qty }}</td>
          <td v-else></td>
        </tr>
        <tr v-else-if="!showLeadCell(rows, index) && item.Trans_id !== 'LOT_PAUSE'">
          <td :style="bg(item.NFC_CODE)">{{ item.WO_ID }}</td>
          <td>{{ item.PART_DESC }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.std }}</td>
          <td v-if="Number(item.time) > 0">{{ Number(item.time).toFixed(2) }}</td>
          <td v-else>未生產</td>
          <td v-if="Number(item.FQC) > 0">{{ currentEff(item) }}%</td>
          <td v-else></td>
          <td v-if="Number(item.PasstEFF) > 0">{{ (Number(item.PasstEFF) * 100).toFixed(2) }}%</td>
          <td v-else>近一年無生產</td>
          <td v-if="Number(item.FQC) > 0">{{ item.FQC }}</td>
          <td v-else></td>
          <td v-if="Number(item.ship_qty) > 0">{{ item.ship_qty }}</td>
          <td v-else></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ rows: { type: Array, default: () => [] } });

const showLeadCell = (rows, index) =>
  index === 0 || rows[index].NFC_CODE !== rows[index - 1].NFC_CODE ||
  (rows[index].NFC_CODE === rows[index - 1].NFC_CODE && rows[index - 1].Trans_id === 'LOT_PAUSE');

const getRowSpan = (rows, index) => {
  let count = 1;
  for (let i = index + 1; i < rows.length; i += 1) {
    if (rows[i].NFC_CODE === rows[index].NFC_CODE) count += 1;
    else break;
  }
  return count;
};

const bg = (nfcCode) => ({
  backgroundColor:
    nfcCode === '01' ? '#4886ea' :
      nfcCode === '02' ? 'darkgreen' :
        nfcCode === '03' ? 'yellow' :
          nfcCode === '04' ? '#bd91f3' :
            nfcCode === '05' ? 'lightgreen' :
              nfcCode === '06' ? 'orange' : '',
  textAlign: 'center',
  verticalAlign: 'middle',
});

const currentEff = (item) => ((((Number(item.FQC) / Number(item.time)) / (Number(item.qty) / Number(item.std))) * 100).toFixed(2));
</script>
