<template>
  <section>
    <h2>工單管理</h2>
    <div class="toolbar">
      <label>Area <select v-model="selectedArea" @change="fetchWorkOrders"><option>ZH</option><option>TC</option><option>VN</option><option>TW</option></select></label>
      <label>D <select v-model="selectedD" @change="fetchWorkOrders"><option v-for="n in ['1','2','3','4','6']" :key="n">{{ n }}</option></select></label>
      <label>S <select v-model="selectedS" @change="fetchWorkOrders"><option v-for="n in ['1','2','3']" :key="n">{{ n }}</option></select></label>
      <label>C <select v-model="selectedC" @change="fetchWorkOrders"><option v-for="n in ['1','2','3','4','5','6','7','8','9','10','11','12','13','S1','S2','S3','S4','S5','S6']" :key="n">{{ n }}</option></select></label>
      <label>L <select v-model="selectedL" @change="fetchWorkOrders"><option value=""></option><option v-for="n in ['1','2','3','4','5','6','7']" :key="n">{{ n }}</option></select></label>
      <span>Department: {{ selectedDepartment }}</span>
    </div>

    <WorkOrderTable
      :rows="rows"
      :get-row-span="getRowSpan"
      :show-lead-cell="showLeadCell"
      :is-button-disabled="isButtonDisabled"
      @complete="completeTask"
      @pause="showRemarkSelect"
      @rework="reworkFromPaused"
      @adjust-date="openDateDialog"
    />

    <ERPQueryPanel
      :selected-erp="selectedERP"
      :stickers="stickers"
      :is-button-disabled="isButtonDisabled"
      @update:selected-erp="selectedERP = $event"
      @update:stickers="stickers = $event"
      @query="checkAndSelectERP"
    />

    <table>
      <caption>設定工單列表</caption>
      <thead>
        <tr><th>工單</th><th>料號</th><th>品名</th><th>數量</th><th>標準工時</th><th>過往效率</th><th>功能</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in erpRows" :key="`${item.wadoco}-${item.walitm}`">
          <td>{{ item.wadoco }}</td><td>{{ item.walitm }}</td><td>{{ item.wadl01 }}</td><td>{{ item.wauorg }}</td><td>{{ item.wlrunl_sum }}</td>
          <td>{{ (Number(item.avgStdEff || 0) * 100).toFixed(2) }}%</td>
          <td><button @click="removeErpRow(item)">移除</button></td>
        </tr>
        <tr><td colspan="3">總和</td><td>{{ calculateTotal('wauorg') }}</td><td>{{ calculateTotal('wlrunl_sum').toFixed(2) }}</td><td colspan="2"></td></tr>
      </tbody>
    </table>

    <div class="toolbar">
      <label>NFC_CODE
        <select v-model="selectedNfcCode">
          <option value="" disabled>選擇 NFC_CODE</option>
          <option v-for="code in dpOptions" :key="code" :value="code">{{ code }}</option>
        </select>
      </label>
      <button :disabled="loading || isButtonDisabled" @click="uploadData(selectedNfcCode)">送出</button>
    </div>

    <PauseReasonModal
      :open="showPauseModal"
      :remarks="remarks"
      :remark="selectedRemark"
      @update:remark="selectedRemark = $event"
      @cancel="showPauseModal = false"
      @confirm="pauseTask"
    />

    <ReworkDateModal
      :open="showReworkModal"
      :date="reworkDate"
      @update:date="reworkDate = $event"
      @cancel="showReworkModal = false"
      @confirm="updateReworkDate"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ERPQueryPanel from '../components/workorder/ERPQueryPanel.vue';
import PauseReasonModal from '../components/workorder/PauseReasonModal.vue';
import ReworkDateModal from '../components/workorder/ReworkDateModal.vue';
import WorkOrderTable from '../components/workorder/WorkOrderTable.vue';
import { useWorkOrderManage } from '../composables/useWorkOrderManage';

const selectedNfcCode = ref('');
const {
  selectedArea,
  selectedD,
  selectedS,
  selectedC,
  selectedL,
  selectedDepartment,
  selectedERP,
  stickers,
  rows,
  erpRows,
  dpOptions,
  isButtonDisabled,
  showPauseModal,
  selectedRemark,
  remarks,
  showReworkModal,
  reworkDate,
  loading,
  getRowSpan,
  showLeadCell,
  calculateTotal,
  removeErpRow,
  fetchWorkOrders,
  checkAndSelectERP,
  uploadData,
  completeTask,
  showRemarkSelect,
  pauseTask,
  reworkFromPaused,
  openDateDialog,
  updateReworkDate,
} = useWorkOrderManage();
</script>
