import { ref } from 'vue';
import { staffApi } from '../api/staffApi';

export function useStaffManage() {
  const list = ref([]);
  const fetchAttendance = async (mfgDay, jobNumber) => {
    const { data } = await staffApi.getAttendance(mfgDay, jobNumber);
    list.value = data || [];
  };
  return { list, fetchAttendance };
}
