import { computed, onMounted, onUnmounted, ref } from 'vue';
import { boardApi } from '../api/boardApi';

function getDepartment(selectedD, selectedS, selectedC, selectedL) {
  if (selectedL) {
    return `${selectedD}D${selectedS}S${selectedC}-${selectedL}C`;
  }
  return `${selectedD}D${selectedS}S${selectedC}C`;
}

function getCookie(name) {
  const cname = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i += 1) {
    let c = cookieArray[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return '';
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function useRealtimeBoard() {
  const selectedArea = ref(getCookie('selectedArea') || 'VN');
  const selectedD = ref(getCookie('selectedD') || '1');
  const selectedS = ref(getCookie('selectedS') || '1');
  const selectedC = ref(getCookie('selectedC') || '1');
  const selectedL = ref(getCookie('selectedL') || '');

  const realTimeData = ref([]);
  const stationRows = ref([]);
  const onlineData = ref([]);
  const dpOptions = ref([]);
  const effOver = ref(null);
  const loading = ref(false);
  const currentTime = ref('');

  const selectedDepartment = computed(() =>
    getDepartment(selectedD.value, selectedS.value, selectedC.value, selectedL.value),
  );

  const saveFilters = () => {
    setCookie('selectedArea', selectedArea.value, 30);
    setCookie('selectedD', selectedD.value, 30);
    setCookie('selectedS', selectedS.value, 30);
    setCookie('selectedC', selectedC.value, 30);
    setCookie('selectedL', selectedL.value, 30);
  };

  const fetchOnlineData = async () => {
    const { data } = await boardApi.getOnline(selectedArea.value, selectedDepartment.value);
    onlineData.value = data;
  };

  const fetchDPData = async () => {
    const { data } = await boardApi.getDistinctNfcCode(selectedArea.value, selectedDepartment.value);
    dpOptions.value = (data || []).map((item) => {
      const match = item.nfc_code?.match(/\d+$/);
      return match ? match[0] : item.nfc_code;
    });
  };

  const fetchEffData = async () => {
    const today = new Date();
    const month = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;
    const { data } = await boardApi.getEffOver(selectedArea.value, selectedDepartment.value, month);
    effOver.value = data?.result?.[0] || null;
  };

  const fetchData = async () => {
    if (!selectedD.value || !selectedS.value || !selectedC.value) return;
    loading.value = true;
    try {
      const [readWoRes, query2Res] = await Promise.all([
        boardApi.getReadWo(selectedArea.value, selectedDepartment.value),
        boardApi.getQuery2(selectedArea.value, selectedDepartment.value),
      ]);
      realTimeData.value = readWoRes.data || [];
      stationRows.value = query2Res.data || [];
    } finally {
      loading.value = false;
      await Promise.allSettled([fetchOnlineData(), fetchDPData(), fetchEffData()]);
    }
  };

  const refreshTick = async () => {
    currentTime.value = new Date().toLocaleTimeString();
    await fetchData();
  };

  let intervalId;
  onMounted(async () => {
    await fetchData();
    intervalId = window.setInterval(() => {
      refreshTick();
    }, 15000);
  });
  onUnmounted(() => {
    if (intervalId) window.clearInterval(intervalId);
  });

  return {
    selectedArea,
    selectedD,
    selectedS,
    selectedC,
    selectedL,
    selectedDepartment,
    realTimeData,
    stationRows,
    onlineData,
    dpOptions,
    effOver,
    loading,
    currentTime,
    saveFilters,
    fetchData,
    fetchOnlineData,
    fetchDPData,
  };
}
