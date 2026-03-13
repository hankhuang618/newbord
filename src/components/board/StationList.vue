<template>
  <table>
    <caption>工站列表</caption>
    <thead>
      <tr><th>設備</th><th>姓名</th><th>工時</th><th>工站</th><th>座位</th><th>工站</th><th>工時</th><th>姓名</th><th>設備</th></tr>
    </thead>
    <tbody>
      <tr v-for="item in rows" :key="item.seatID" v-show="item.l_NameID !== '' || item.r_NameID !== ''">
        <td>{{ item.l_Machine }}</td>
        <td :style="nameStyle(item.l_WoID, item.l_NameID, item.l_NfcCode)">{{ item.l_NameID }}</td>
        <td>{{ Number(item.l_PT || 0).toFixed(2) }}/hr</td>
        <td :style="workStyle(item.l_WorkContent)">{{ item.l_WorkContent }}</td>
        <td>{{ item.seatID }}</td>
        <td :style="workStyle(item.r_WorkContent)">{{ item.r_WorkContent }}</td>
        <td>{{ Number(item.r_PT || 0).toFixed(2) }}/hr</td>
        <td :style="nameStyle(item.r_WoID, item.r_NameID, item.r_NfcCode)">{{ item.r_NameID }}</td>
        <td>{{ item.r_Machine }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ rows: { type: Array, default: () => [] } });

const bgColor = (nfcCode) =>
  nfcCode === '01' ? '#4886ea' : nfcCode === '02' ? 'darkgreen' : nfcCode === '03' ? 'yellow' : nfcCode === '04' ? '#bd91f3' : nfcCode === '05' ? 'lightgreen' : nfcCode === '06' ? 'orange' : '';

const nameStyle = (woId, nameId, nfcCode) => ({
  backgroundColor: woId === '' && nameId !== '' ? 'red' : bgColor(nfcCode),
  textAlign: 'center',
  verticalAlign: 'middle',
});

const workStyle = (workContent) => {
  if (workContent === '做線') return 'color: rgb(255, 211, 6); font-weight: bold;';
  if (workContent === '焊接') return 'color: blue; font-weight: bold;';
  if (workContent === '成型') return 'color: purple; font-weight: bold;';
  if (workContent === '成型S') return 'color: purple; font-weight: bold;background-color: rgb(187, 255, 187);';
  if (workContent === '做線S') return 'color: rgb(255, 211, 6); font-weight: bold;background-color: rgb(187, 255, 187);';
  if (workContent === '焊接S') return 'color: blue; font-weight: bold;background-color: rgb(187, 255, 187);';
  return 'color: black;';
};
</script>
