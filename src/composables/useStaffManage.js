import { computed, onMounted, ref } from 'vue';
import { staffApi } from '../api/staffApi';

export function useStaffManage() {
  const selectedArea = ref('VN');
  const selectedD = ref('1');
  const selectedS = ref('1');
  const selectedC = ref('1');
  const selectedL = ref('');

  const staffData = ref([]);
  const showActions = ref(false);
  const showForm = ref(false);
  const newStaff = ref({ department: '', jobnumber: '', username: '', work_department: '' });

  const selectedDepartment = computed(() => `${selectedD.value}D${selectedS.value}S${selectedC.value}C`);

  const staffDataFetch = async () => {
    if (!selectedArea.value || !selectedD.value || !selectedS.value || !selectedC.value) return;
    const { data } = await staffApi.getStaffList({ area: selectedArea.value, department: selectedDepartment.value });
    staffData.value = data || [];
  };

  const newStaffMode = () => {
    newStaff.value.department = selectedDepartment.value;
    showForm.value = true;
  };
  const showDelete = () => { showActions.value = true; };
  const showUpdate = () => {
    showActions.value = true;
    staffData.value.forEach((item) => { item.editable = true; });
  };
  const cancelMode = async () => {
    showActions.value = false;
    showForm.value = false;
    staffData.value.forEach((item) => { item.editable = false; });
    await staffDataFetch();
  };

  const addNewStaff = async () => {
    await staffApi.createAttendance({
      area: selectedArea.value,
      department: newStaff.value.department,
      jobnumber: newStaff.value.jobnumber,
      username: newStaff.value.username,
      work_department: newStaff.value.work_department ? newStaff.value.work_department : '',
    });
    newStaff.value = { department: '', jobnumber: '', username: '', work_department: '' };
    showForm.value = false;
    await staffDataFetch();
  };

  const toggleStatus = async (id, show) => {
    await staffApi.updateShow({ id: parseInt(id, 10), area: selectedArea.value, show: show === 'T' ? 'F' : 'T' });
  };

  const deleteStaffData = async (id) => {
    await staffApi.deleteAttendance({ id: parseInt(id, 10), area: selectedArea.value });
    showActions.value = false;
    await staffDataFetch();
  };

  const updateStaffData = async (item) => {
    await staffApi.updateUser({
      id: item.id.toString(),
      area: selectedArea.value,
      department: item.department,
      jobnumber: item.jobnumber,
      username: item.username,
      work_department: item.work_department,
    });
    showActions.value = false;
    await staffDataFetch();
  };

  const deleteHr = async (id) => {
    await staffApi.deleteHr({ id: parseInt(id, 10), area: selectedArea.value });
    showActions.value = false;
    await staffDataFetch();
  };

  const updateStatus = async (jobNumber, status) => {
    let hrtime;
    let note;
    if (status === '請假') {
      hrtime = '0';
      note = window.prompt('請輸入理由:');
    } else if (status === '夜班') {
      hrtime = '0';
      note = '';
    } else if (status === '備註') {
      hrtime = '0';
      note = window.prompt('請輸入理由:');
    } else if (status === '借出') {
      while (true) {
        hrtime = window.prompt('請輸有效考勤工時（只能輸入數字）：');
        if (!Number.isNaN(Number(hrtime))) break;
      }
      const options = ['廠內重工工時', '其它廠重工工時', '其他借出工時'];
      let choice;
      while (true) {
        choice = window.prompt(`請輸入理由:\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n`);
        if (choice >= 1 && choice <= options.length) {
          note = options[choice - 1];
          break;
        }
      }
    } else {
      while (true) {
        hrtime = window.prompt('請輸有效考勤工時（只能輸入數字）：');
        if (!Number.isNaN(Number(hrtime))) break;
      }
      note = window.prompt('請輸入理由:');
    }

    await staffApi.updateStatus({
      area: selectedArea.value,
      jobnumber: jobNumber,
      ststus: status,
      hr_time: hrtime,
      note,
    });
    await staffDataFetch();
  };

  onMounted(staffDataFetch);

  return {
    selectedArea, selectedD, selectedS, selectedC, selectedL, selectedDepartment,
    staffData, showActions, showForm, newStaff,
    staffDataFetch, newStaffMode, showDelete, showUpdate, cancelMode, addNewStaff,
    toggleStatus, deleteStaffData, updateStaffData, deleteHr, updateStatus,
  };
}
