import { computed, onMounted, ref } from 'vue';
import { workOrderApi } from '../api/workOrderApi';

const getDepartment = (d, s, c, l) => (l ? `${d}D${s}S${c}-${l}C` : `${d}D${s}S${c}C`);

export function useWorkOrderManage() {
  const selectedArea = ref('VN');
  const selectedD = ref('1');
  const selectedS = ref('1');
  const selectedC = ref('1');
  const selectedL = ref('');
  const selectedERP = ref('');
  const stickers = ref('GEN');

  const rows = ref([]);
  const erpRows = ref([]);
  const dpOptions = ref([]);

  const isButtonDisabled = ref(false);
  const showPauseModal = ref(false);
  const selectedRemark = ref('');
  const currentWoId = ref(null);
  const currentNfcCode = ref(null);

  const showReworkModal = ref(false);
  const reworkId = ref(null);
  const reworkDate = ref('');

  const loading = ref(false);

  const selectedDepartment = computed(() =>
    getDepartment(selectedD.value, selectedS.value, selectedC.value, selectedL.value),
  );

  const remarks = ['設備異常', '待料', '待人', '品質異常', '換線', '其他'];

  const fetchWorkOrders = async () => {
    const { data } = await workOrderApi.getReadWo(selectedArea.value, selectedDepartment.value);
    rows.value = data || [];
  };

  const fetchDPData = async () => {
    const { data } = await workOrderApi.getDistinctNfcCode(selectedArea.value, selectedDepartment.value);
    dpOptions.value = (data || []).map((item) => {
      const match = item.nfc_code?.match(/\d+$/);
      return match ? match[0] : item.nfc_code;
    });
  };

  const getRowSpan = (index) => {
    let count = 1;
    for (let i = index + 1; i < rows.value.length; i += 1) {
      if (rows.value[i].NFC_CODE === rows.value[index].NFC_CODE) count += 1;
      else break;
    }
    return count;
  };

  const showLeadCell = (index) =>
    index === 0 || rows.value[index].NFC_CODE !== rows.value[index - 1].NFC_CODE ||
    (rows.value[index].NFC_CODE === rows.value[index - 1].NFC_CODE && rows.value[index - 1].Trans_id === 'LOT_PAUSE');

  const calculateTotal = (prop) => erpRows.value.reduce((total, item) => total + Number(item[prop] || 0), 0);

  const removeErpRow = (item) => {
    const idx = erpRows.value.indexOf(item);
    if (idx >= 0) erpRows.value.splice(idx, 1);
  };

  const totwo = () => erpRows.value.map((item) => item.wadoco).join(',');

  const executeUpdate = async (selectedNfcCode) => {
    const updateData = {
      nickName: totwo(),
      department: selectedDepartment.value,
      area: selectedArea.value,
      nfC_CODE: selectedNfcCode,
    };
    await workOrderApi.updateWorkOrder(updateData);
  };

  const uploadData = async (selectedNfcCode) => {
    if (!selectedNfcCode || !String(selectedNfcCode).trim()) {
      alert('NFC Code 不能为空或 NULL');
      return;
    }
    loading.value = true;
    try {
      const totalQty = calculateTotal('wauorg');
      const totalStdTime = calculateTotal('wlrunl_sum');
      const allWoIds = totwo();
      for (const item of erpRows.value) {
        await workOrderApi.createWorkOrder({
          area: selectedArea.value,
          department: selectedDepartment.value,
          woId: item.wadoco,
          transId: 'LOT_START',
          qty: Number(item.wauorg),
          nfcCode: selectedNfcCode,
          partNo: item.walitm,
          partDesc: item.wadl01,
          standardTime: Number(item.wlrunl_sum),
          totalWo: allWoIds,
          totalQty,
          totalStdTime: totalStdTime.toFixed(2),
          PasstEFF: item.avgStdEff || 0,
        });
      }
      await executeUpdate(selectedNfcCode);
      erpRows.value = [];
      selectedERP.value = '';
      await fetchWorkOrders();
    } finally {
      loading.value = false;
    }
  };

  const addManually = (woId) => {
    erpRows.value.push({ wadoco: woId, walitm: woId, wadl01: '手動新增工單', wauorg: '0', wlrunl_sum: '1', avgStdEff: 0 });
    isButtonDisabled.value = false;
  };

  const selectERP = async () => {
    const woId = selectedERP.value;
    const special = {
      '100': '試產工單', '200': '來料全檢', '300': '貼紙班', '400': '重工', '700': '物料員工時', '800': '重工開線',
    };
    if (special[woId]) {
      erpRows.value.push({ wadoco: woId, walitm: woId, wadl01: special[woId], wauorg: '0', wlrunl_sum: '1', avgStdEff: 0 });
      isButtonDisabled.value = false;
      selectedERP.value = '';
      return;
    }

    try {
      const { data } = await workOrderApi.getErpWoid({ wadoco: woId });
      if (!data || !data.length) {
        const yes = window.confirm('查無工單，是否手動新增？');
        if (yes) addManually(woId);
      } else {
        erpRows.value.push(...data);
      }
    } finally {
      selectedERP.value = '';
      isButtonDisabled.value = false;
    }
  };

  const selectStickers = async (type) => {
    const woId = selectedERP.value;
    try {
      const { data } = await workOrderApi.getSnList(woId, type);
      const snList = data?.result || [];
      if (!snList.length || snList[0].wadoco === '') {
        const yes = window.confirm('查無工單，是否手動新增？');
        if (yes) addManually(woId);
      } else {
        erpRows.value.push(...snList);
      }
    } finally {
      selectedERP.value = '';
      isButtonDisabled.value = false;
    }
  };

  const checkAndSelectERP = async () => {
    isButtonDisabled.value = true;
    const existInErp = erpRows.value.find((item) => item.wadoco === selectedERP.value);
    const existInRealtime = rows.value.find((item) => item.WO_ID === selectedERP.value);
    if (existInErp || existInRealtime) {
      alert('工單已存在');
      selectedERP.value = '';
      isButtonDisabled.value = false;
      return;
    }
    if (stickers.value === 'TZ' || stickers.value === 'CD') await selectStickers(stickers.value);
    else await selectERP();
  };

  const completeTask = async (woId, nfcCode) => {
    await workOrderApi.completeLot(selectedArea.value, selectedDepartment.value, nfcCode, woId);
    alert('更新完成');
    await fetchWorkOrders();
  };

  const showRemarkSelect = (woId, nfcCode) => {
    currentWoId.value = woId;
    currentNfcCode.value = nfcCode;
    selectedRemark.value = '';
    showPauseModal.value = true;
  };

  const pauseTask = async () => {
    if (!selectedRemark.value) return;
    const now = new Date();
    const reWORKDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    await workOrderApi.pauseLot(
      selectedArea.value,
      selectedDepartment.value,
      currentNfcCode.value,
      currentWoId.value,
      selectedRemark.value,
      reWORKDate,
    );
    showPauseModal.value = false;
    selectedRemark.value = '';
    currentWoId.value = null;
    currentNfcCode.value = null;
    await fetchWorkOrders();
  };

  const reworkFromPaused = (item) => {
    const existing = erpRows.value.find((data) => data.wadoco === item.WO_ID);
    if (existing) {
      alert('工單已存在於清單中，無法重複添加！');
      return;
    }
    erpRows.value.push({
      wadoco: item.WO_ID,
      walitm: item.PART_NO,
      wadl01: item.PART_DESC,
      wauorg: item.qty,
      wlrunl_sum: item.std,
      avgStdEff: item.PasstEFF || 0,
    });
  };

  const openDateDialog = (id) => {
    reworkId.value = id;
    showReworkModal.value = true;
  };

  const updateReworkDate = async () => {
    if (!reworkDate.value) {
      alert('請選擇日期！');
      return;
    }
    isButtonDisabled.value = true;
    try {
      await workOrderApi.updateReworkDate({ area: selectedArea.value, reworkDate: reworkDate.value, id: String(reworkId.value) });
    } finally {
      isButtonDisabled.value = false;
      showReworkModal.value = false;
      reworkId.value = null;
      reworkDate.value = '';
      await fetchDPData();
      await fetchWorkOrders();
    }
  };

  onMounted(async () => {
    await fetchWorkOrders();
    await fetchDPData();
  });

  return {
    selectedArea, selectedD, selectedS, selectedC, selectedL, selectedDepartment,
    selectedERP, stickers, rows, erpRows, dpOptions,
    isButtonDisabled, showPauseModal, selectedRemark, remarks,
    showReworkModal, reworkDate, loading,
    getRowSpan, showLeadCell, calculateTotal, removeErpRow,
    fetchWorkOrders, checkAndSelectERP, uploadData,
    completeTask, showRemarkSelect, pauseTask, reworkFromPaused,
    openDateDialog, updateReworkDate,
  };
}
