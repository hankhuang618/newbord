import http from './http';

export const staffApi = {
  getAttendance(mfgDay, jobNumber) {
    return http.get(`/api/Attendance/ATT_RAWDATA?MFG_DAY=${mfgDay}&JOB_NUMBER=${jobNumber}`);
  },
  updateStatus(payload) {
    return http.post('/api/Attendance/UPDATESTATUS', payload);
  },
  createAttendance(payload) {
    return http.post('/api/Attendance/creat', payload);
  },
  deleteAttendance(payload) {
    return http.delete('/api/Attendance/Delete', { data: payload });
  },
};
