<template>
  <section class="realtime-page">
    <div class="legacy-header">
      <div class="left-head">
        <div class="logo">Logo</div>
        <label>廠區:
          <select v-model="selectedArea" @change="onFilterChange"><option>ZH</option><option>TC</option><option>VN</option><option>TW</option></select>
        </label>
        <label>部門:
          <select v-model="selectedD" @change="onFilterChange"><option v-for="n in ['1','2','3','4','6']" :key="n">{{ n }}</option></select>
        </label>
        <label>部
          <select v-model="selectedS" @change="onFilterChange"><option v-for="n in ['1','2','3']" :key="n">{{ n }}</option></select>
        </label>
        <label>課
          <select v-model="selectedC" @change="onFilterChange"><option v-for="n in ['1','2','3','4','5','6','7','8','9','10','11','12','13','S1','S2','S3','S4','S5','S6']" :key="n">{{ n }}</option></select>
        </label>
        <label>班
          <select v-model="selectedL" @change="onFilterChange"><option value=""></option><option v-for="n in ['1','2','3','4','5','6','7']" :key="n">{{ n }}</option></select>
        </label>
        <label>拉</label>
      </div>
      <div class="right-head">Language:
        <select><option>中文</option><option>English</option><option>Tiếng Việt</option></select>
      </div>
    </div>

    <h1 class="board-title">在線生產看板</h1>
    <div class="online">在線人數: {{ onlineCount }}</div>

    <div class="quick-actions">
      <button @click="go('/staff')">人員管理</button>
      <button @click="go('/fqc')">完工數量</button>
    </div>

    <div class="switch-row">
      <button>調整</button>
      <label><input type="checkbox" checked /> 欄位合併</label>
      <label><input type="checkbox" checked /> 做線</label>
      <label><input type="checkbox" checked /> 成型</label>
      <label><input type="checkbox" checked /> 焊接</label>
      <label v-for="n in 6" :key="n"><input type="checkbox" /> 欄位{{ n }}</label>
    </div>

    <table class="legacy-table">
      <thead>
        <tr>
          <th>時段<br/>thời gian</th>
          <th>人數<br/>Số người</th>
          <th>總時數<br/>Tổng số giờ</th>
          <th>品名<br/>Tên sản phẩm</th>
          <th>輸入工時<br/>Nhập giờ làm việc</th>
          <th>標準產能<br/>Số lượng tiêu chuẩn</th>
          <th>實際產出<br/>Số lượng thực tế</th>
          <th>效率<br/>hiệu quả</th>
          <th>不良品<br/>Hàng NG</th>
          <th>做線<br/>làm dây</th>
          <th>成型<br/>thành hình</th>
          <th>焊接<br/>Hàn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in productionRows" :key="`${row.WO_ID}-${idx}`">
          <td>{{ row.timeRange }}</td>
          <td>{{ row.people }}</td>
          <td>{{ row.workHours }}</td>
          <td>{{ row.PART_DESC }}</td>
          <td>{{ row.inputHours }}</td>
          <td>{{ row.standardQty }}</td>
          <td>{{ row.actualQty }}</td>
          <td :class="{ danger: Number(row.efficiency) < 90 }">{{ row.efficiency }}%</td>
          <td>{{ row.ngQty }}</td>
          <td>{{ row.LINE || 0 }}</td>
          <td>{{ row.MD || 0 }}</td>
          <td>{{ row.WELD || 0 }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>總計</th>
          <th>{{ summary.people }}</th>
          <th>{{ summary.workHours }}</th>
          <th></th>
          <th>{{ summary.inputHours }}</th>
          <th>{{ summary.standardQty }}</th>
          <th>{{ summary.actualQty }}</th>
          <th>{{ summary.efficiency }}%</th>
          <th>{{ summary.ngQty }}</th>
          <th>{{ summary.line }}</th>
          <th>{{ summary.md }}</th>
          <th>{{ summary.weld }}</th>
        </tr>
      </tfoot>
    </table>

    <h3>依產品分類加總資料</h3>
    <table class="legacy-table">
      <thead>
        <tr><th>品名</th><th>輸入工時</th><th>標準產能</th><th>實際產出</th><th>不良品</th><th>不良率</th><th>效率</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in productSummary" :key="item.partDesc">
          <td>{{ item.partDesc }}</td>
          <td>{{ item.inputHours }}</td>
          <td>{{ item.standardQty }}</td>
          <td>{{ item.actualQty }}</td>
          <td>{{ item.ngQty }}</td>
          <td>{{ item.ngRate }}%</td>
          <td :class="{ danger: Number(item.efficiency) < 90 }">{{ item.efficiency }}%</td>
        </tr>
      </tbody>
    </table>

    <WorkOrderList :rows="realTimeData" />
    <StationList :rows="stationRows" />
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import StationList from '../components/board/StationList.vue';
import WorkOrderList from '../components/board/WorkOrderList.vue';
import { useRealtimeBoard } from '../composables/useRealtimeBoard';

const router = useRouter();
const {
  selectedArea,
  selectedD,
  selectedS,
  selectedC,
  selectedL,
  realTimeData,
  stationRows,
  productionRows,
  productSummary,
  summary,
  onlineCount,
  saveFilters,
  fetchData,
} = useRealtimeBoard();

const onFilterChange = async () => {
  saveFilters();
  await fetchData();
};

const go = (path) => router.push(path);
</script>
